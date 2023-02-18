import { Album } from 'src/app/albums/entities/album.entity';
import { Track } from 'src/app/tracks/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '256' })
  name: string;

  @Column({ type: 'bool' })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];
}
