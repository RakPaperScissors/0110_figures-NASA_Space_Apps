import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FloodMark } from './database/entities/flood_marks/entities/flood_mark.entity';
import { Post } from './database/entities/posts/entities/post.entity';
import { Report } from './database/entities/reports/entities/report.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { FloodMarksModule } from './database/entities/flood_marks/flood_marks.module';
import { ReportsModule } from './database/entities/reports/reports.module';
import { TasksModule } from './tasks/tasks.module';
import { PostsModule } from './database/entities/posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('PGHOST'),
        port: 5432,
        username: configService.get<string>('PGUSER'),
        password: configService.get<string>('PGPASSWORD'),
        database: configService.get<string>('PGDATABASE'),
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [FloodMark, Post, Report],
        synchronize: true, 
      }),
    }),
    ScheduleModule.forRoot(), // Initialize the scheduler
    FloodMarksModule,
    ReportsModule,
    TasksModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}