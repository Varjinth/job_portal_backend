// src/job_posts/dto/create-job_post.dto.ts

import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateJobPostDto {
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  jobType: string;

  @IsNumber()
  salaryFrom: number;

  @IsNumber()
  salaryTo: number;

  @IsDateString()
  deadline: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsString()
  responsibilities: string;

  @IsString()
  experience: string;
}
