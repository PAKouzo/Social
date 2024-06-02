import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: config.get<String>('REDIS_HOST'),
        port: config.get<Number>('REDIS_PORT'),
        username: config.get<String>('REDIS_USERNAME'),
        password: config.get<String>('REDIS_PASSWORD')
      })
    })
    // CacheModule.register({
    //   ttl: 10000, //time lưu trữ trong bộ nhớ đệm, hết time dữ liệu sẽ bị xóa.
    // }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
