import { Injectable } from '@nestjs/common';
import { CreateJobPostDto } from './dto/create-job_post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobPost } from './entities/job_post.entity';
import { differenceInHours, differenceInDays } from 'date-fns';

@Injectable()
export class JobPostsService {
  constructor(
    @InjectRepository(JobPost)
    private readonly jobPostRepository: Repository<JobPost>,
  ) {}

  async create(createJobPostDto: CreateJobPostDto): Promise<JobPost> {
    const jobPost = this.jobPostRepository.create(createJobPostDto);
    return this.jobPostRepository.save(jobPost);
  }

  async findAll(filters: {
    jobTitle?: string;
    location?: string;
    jobType?: string;
    salaryRange?: string;
  }): Promise<any[]> {
    const query = this.jobPostRepository.createQueryBuilder('job_post');
  
    if (filters.jobTitle) {
      query.andWhere('job_post.jobTitle ILIKE :jobTitle', { jobTitle: `%${filters.jobTitle}%` });
    }
  
    if (filters.location) {
      query.andWhere('job_post.location ILIKE :location', { location: `%${filters.location}%` });
    }
  
    if (filters.jobType) {
      query.andWhere('job_post.jobType = :jobType', { jobType: filters.jobType });
    }

    if (filters.salaryRange) {
      const [minMonthly, maxMonthly] = filters.salaryRange.split(',').map(Number);
      const minYearly = minMonthly * 12;
      const maxYearly = maxMonthly * 12;

    
      query.andWhere('job_post.salaryFrom <= :maxYearly', { maxYearly });
      query.andWhere('job_post.salaryTo >= :minYearly', { minYearly });
    }
    
  
    const jobPosts = await query.getMany();

    const formattedPosts = jobPosts.map((job) => {
      const descriptionArray = job.description
        ? job.description.split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0)
        : [];
  
      const postedAt = (() => {
        const now = new Date();
        const createdAt = new Date(job.postedAt);
  
        const hoursDiff = differenceInHours(now, createdAt);
        const daysDiff = differenceInDays(now, createdAt);
  
        if (hoursDiff < 1) {
          return '<1h Ago';
        } else if (daysDiff < 1) {
          return `${hoursDiff}h Ago`;
        } else {
          return `${daysDiff}d Ago`;
        }
      })();
  
      return {
        ...job,
        description: descriptionArray,
        postedAt: postedAt,
        salaryTo: `${(job.salaryTo / 100000).toFixed(0)}LPA`,
      };
    });
  
    return formattedPosts;
  }
  
}
