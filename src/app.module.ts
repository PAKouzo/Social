import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from 'src/database/database.module';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    PostModule,
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
})
export class AppModule {}

  //   ConfigModule.forRoot(
  //     {
  //     validationSchema: Joi.object({
  //       POSTGRES_HOST: Joi.string().required(),
  //       POSTGRES_PORT: Joi.number().required(),
  //       POSTGRES_USER: Joi.string().required(),
  //       POSTGRES_PASSWORD: Joi.string().required(),
  //       POSTGRES_DB: Joi.string().required(),
  //       // PORT: Joi.number(),
  //     }),
  //   }
  // ),

      // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     transport: {
    //       host: config.get('MAIL_HOST'),
    //       secure: false,
    //       port: 465,
    //       auth: {
    //         user: config.get('MAIL_USER'),
    //         password: config.get('MAIL_PASSWORD'),
    //       },
    //     },
    //     defaults: {
    //       from: `"No Reply" <${config.get('MAIL_FROM')}>`,
    //     },
    //     template: {
    //       dir: join(__dirname, './templates'),
    //       // src/templates/email
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // }),