import { Artist } from 'src/app/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumModel } from '../models/album.model';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '256' })
  name: string;

  @Column({ type: 'int' })
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.id, { nullable: true })
  artistId: string | null;

  constructor(album: AlbumModel) {
    Object.assign(this, album);
  }
}
