import { Module } from "@nestjs/common";
import { CommentController } from "./app.controller";
import { CommentService } from "./app.service";

@Module({
    controllers: [CommentController],
    providers: [CommentService]
})
export class CommentModule{}