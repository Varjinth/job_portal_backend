import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobPostsModule } from './job_posts/job_posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPost } from './job_posts/entities/job_post.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      entities: [JobPost],
    }),
    JobPostsModule,
  ],
})

export class AppModule {}
