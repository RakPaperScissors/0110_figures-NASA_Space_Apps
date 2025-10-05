import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for local development
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      /^http:\/\/192\.168\.\d+\.\d+:(5173|5174)$/, // Allow local network
      /^http:\/\/10\.\d+\.\d+\.\d+:(5173|5174)$/, // Allow local network
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-ID', 'X-Username'],
  });
  
  const port = 3000;
  await app.listen(port);
  console.log(`Application is running on http://localhost:${port}`);
}
bootstrap();
