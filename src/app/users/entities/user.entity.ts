import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '256', unique: true })
  login: string;

  @Exclude()
  @Column({ type: 'varchar', length: '256' })
  password: string;

  @VersionColumn()
  version: number;

  @Exclude()
  @Column({ type: 'varchar', default: '' })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
