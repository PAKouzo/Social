import { Module } from "@nestjs/common";
import { UserController } from "./app.controller";
import { UserService } from "./app.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
    imports: [CloudinaryModule],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {};