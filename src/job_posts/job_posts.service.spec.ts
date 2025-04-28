// src/job_posts/job_posts.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from './entities/job_post.entity';
import { CreateJobPostDto } from './dto/create-job_post.dto';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectRepository(JobPost)
    private jobPostRepository: Repository<JobPost>,
  ) {}

  async create(createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const jobPost = this.jobPostRepository.create(createJobPostDto);
    return this.jobPostRepository.save(jobPost);
  }

  async findAll(): Promise<JobPost[]> {
    return this.jobPostRepository.find();
  }
}
