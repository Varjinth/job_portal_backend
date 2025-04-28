

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class JobPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  jobType: string;

  @Column('decimal')
  salaryFrom: number;

  @Column('decimal')
  salaryTo: number;

  @Column()
  deadline: string;

  @Column({ type: 'text' })
  description: string;
  
  @Column({ nullable: true })
  requirements: string;

  @Column({ nullable: true })
  responsibilities: string;

  @Column()
  experience: string;

  @CreateDateColumn()
  postedAt: Date;

}

  