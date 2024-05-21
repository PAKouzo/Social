import { Module } from "@nestjs/common";
import { UserController } from "./app.controller";
import { UserService } from "./app.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "src/entities/user.entity";

@Module({
    imports: [CloudinaryModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {};