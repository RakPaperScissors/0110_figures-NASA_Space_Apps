import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { MarkStatus } from 'src/database/enums/mark-status.enum';
import { SeverityLevel } from 'src/database/enums/severity-level.enum';

@Entity('flood_marks')
export class FloodMark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: false,
  })
  location: object; 

  @Column({
    type: 'geography',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  area: object;

  @Column({
    type: 'enum',
    enum: MarkStatus,
    default: MarkStatus.ACTIVE,
  })
  status: MarkStatus;

  @Column({
    type: 'enum',
    enum: SeverityLevel,
    default: SeverityLevel.LOW,
  })
  severity: SeverityLevel;

  @Column({ name: 'trust_score', type: 'integer', default: 100 })
  trustScore: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.floodMark, { cascade: true })
  posts: Post[];
}