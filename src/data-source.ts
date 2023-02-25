import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { User } from './app/users/entities/user.entity';
import { Track } from './app/tracks/entities/track.entity';
import { Album } from './app/albums/entities/album.entity';
import { Artist } from './app/artists/entities/artist.entity';
import { Favorites } from './app/favorites/entities/favorites.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  entities: [User, Album, Track, Artist, Favorites],
  migrations: ['dist/db/migrations/*.js'],
  logging: true,
  // migrationsRun: true,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
