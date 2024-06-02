import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private mailerService: MailerService
  ) {}

  async generateToken(payload:{id: number, email: string, name: string, password: string}){
    const access_token = await this.jwtService.signAsync(payload)
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: "secret",
      expiresIn: '2m'
    }) 
    await this.userRepository.update(
      { email: payload.email },
      { password: payload.password },
    );
    return {access_token, refresh_token}
  }

  async create(data: CreateUserDto) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await this.userRepository.create({
      ...data,
      password: hash,
    });
    await this.userRepository.save(newUser);
    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Welcome to my website!',
      template: '../templates/email/email.hbs'
    })
    return await newUser;
  }

  async login(data: LoginDTO): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.UNAUTHORIZED);
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = {id:user.id, email: user.email, name: user.name, password: user.password}
    return await this.generateToken(payload);
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try{
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: 'secret'
      })
    }
    catch(e){
      throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST)
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async getlistsUser() {
    return await this.userRepository.find();
  }
}
