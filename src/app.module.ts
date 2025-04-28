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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'varji5697',
      database: 'postgres',
      entities: [JobPost],
      synchronize: true,
    }),
    JobPostsModule,
  ],
})

export class AppModule {}
