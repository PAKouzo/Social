import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDTO): Promise<any> {
    const user = await this.userService.login(loginDto);
    return await user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refresh_token }) {
    return await this.userService.refreshToken(refresh_token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get()
  async getlistsUser() {
    return await this.userService.getlistsUser();
  }
}
