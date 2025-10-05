import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FloodMark } from '../../flood_marks/entities/flood_mark.entity';
import { Report } from '../../reports/entities/report.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'flood_mark_id', type: 'uuid' })
  floodMarkId: string;

  @ManyToOne(() => FloodMark, (floodMark) => floodMark.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flood_mark_id' })
  floodMark: FloodMark;

  @Column({ name: 'device_id', type: 'text' })
  deviceId: string;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'bytea', nullable: true })
  image: Buffer;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ name: 'fake_report_count', type: 'integer', default: 0 })
  fakeReportCount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  // A Post can have many Reports.
  @OneToMany(() => Report, (report) => report.post, { cascade: true })
  reports: Report[];
}