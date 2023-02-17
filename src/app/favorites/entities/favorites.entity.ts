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

@Entity('favorites')
export class Favorites {
  //   @PrimaryGeneratedColumn('uuid')
  //   id: string;
  //   @PrimaryColumn('uuid', { array: true, default: [] })
  @PrimaryGeneratedColumn('uuid')
  @ManyToMany(() => Artist)
  @JoinTable()
  artists: Artist[];

  //   @PrimaryColumn('uuid', { array: true, default: [] })
  @PrimaryGeneratedColumn('uuid')
  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  //   @PrimaryColumn('uuid', { array: true, default: [] })
  @PrimaryGeneratedColumn('uuid')
  @ManyToMany(() => Track)
  @JoinTable()
  tracks: Track[];
}
