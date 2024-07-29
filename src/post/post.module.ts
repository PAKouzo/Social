import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { BullModule } from '@nestjs/bull';
import { PostFileUpload } from './post.process';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    CloudinaryModule,
    BullModule.registerQueue({name: 'fileUpload'})
  ],
  controllers: [PostController],
  providers: [PostService, PostFileUpload]
})
export class PostModule {}
// CacheModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (config: ConfigService) => ({
//         isGlobal: true,
//         store: redisStore,
//         host: config.get<String>('REDIS_HOST'),
//         port: config.get<Number>('REDIS_PORT'),
//         username: config.get<String>('REDIS_USERNAME'),
//         password: config.get<String>('REDIS_PASSWORD')
//       })
//     })
    // CacheModule.register({
    //   ttl: 10000, //time lưu trữ trong bộ nhớ đệm, hết time dữ liệu sẽ bị xóa.
    // }),