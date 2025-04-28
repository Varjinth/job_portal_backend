import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobPostsModule } from './job_posts/job_posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from './job_posts/entities/job_post.entity';


@Module({
  imports: [
  ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [JobPost],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    JobPostsModule,
  ],
})

export class AppModule {}