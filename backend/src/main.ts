import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get frontend URL from environment variable for production
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      frontendUrl, // Railway frontend URL
      /^https?:\/\/.*\.railway\.app$/, // Allow all Railway apps
      /^http:\/\/192\.168\.\d+\.\d+:(5173|5174)$/, // Allow local network
      /^http:\/\/10\.\d+\.\d+\.\d+:(5173|5174)$/, // Allow local network
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-ID', 'X-Username'],
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Bind to 0.0.0.0 for Railway
  console.log(`Application is running on port ${port}`);
}
bootstrap();
