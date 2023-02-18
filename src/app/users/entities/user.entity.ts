import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '256' })
  login: string;

  @Exclude()
  @Column({ type: 'varchar', length: '256' })
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
