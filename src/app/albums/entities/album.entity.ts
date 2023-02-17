import { Artist } from 'src/app/artists/entities/artist.entity';
import { Track } from 'src/app/tracks/entities/track.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumModel } from '../models/album.model';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '256' })
  name: string;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artistId: string | null;

  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[];
}
