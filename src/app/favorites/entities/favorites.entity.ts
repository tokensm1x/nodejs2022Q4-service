import { Exclude, Transform } from 'class-transformer';
import { Album } from 'src/app/albums/entities/album.entity';
import { AlbumModel } from 'src/app/albums/models/album.model';
import { Artist } from 'src/app/artists/entities/artist.entity';
import { ArtistModel } from 'src/app/artists/models/artist.model';
import { Track } from 'src/app/tracks/entities/track.entity';
import { TrackModel } from 'src/app/tracks/models/track.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Artist, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tracks: Track[];
}
