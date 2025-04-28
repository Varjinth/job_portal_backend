// src/job_posts/job_posts.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostsService } from './job_posts.service';
import { JobPostsController } from './job_posts.controller';
import { JobPost } from './entities/job_post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobPost])],
  controllers: [JobPostsController],
  providers: [JobPostsService],
})
export class JobPostsModule {}
