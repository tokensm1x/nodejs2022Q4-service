import { Exclude } from 'class-transformer';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
