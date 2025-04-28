import { Controller, Get, Post, Body, Query} from '@nestjs/common';
import { JobPostsService } from './job_posts.service';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { JobPost } from './entities/job_post.entity';

@Controller('job-posts')
export class JobPostsController {
  constructor(private readonly jobPostsService: JobPostsService) {}

  @Post()
  async create(@Body() createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    return this.jobPostsService.create(createJobPostDto);
  }

  @Get()
  findAll(
    @Query('jobTitle') jobTitle?: string,
    @Query('location') location?: string,
    @Query('jobType') jobType?: string,
    @Query('salaryRange') salaryRange?: string,
  ) {
    return this.jobPostsService.findAll({ jobTitle, location, jobType, salaryRange });
  }
}
