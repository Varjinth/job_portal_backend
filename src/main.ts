import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://job-portal-dashboard-nine.vercel.app', 'http://localhost:3000'],
  }); 
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0'); 
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();


