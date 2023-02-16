import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistModel } from '../models/artist.model';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '256' })
  name: string;

  @Column({ type: 'bool' })
  grammy: boolean;

  constructor(artist: ArtistModel) {
    Object.assign(this, artist);
  }
}
