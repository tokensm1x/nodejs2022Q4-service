import { Album } from 'src/app/albums/entities/album.entity';
import { Artist } from 'src/app/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrackModel } from '../models/track.model';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '256' })
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  albumId: string | null;

  @Column({ type: 'decimal' })
  duration: number;
}
