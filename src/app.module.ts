import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TracksModule } from './app/tracks/tracks.module';
import { AlbumsModule } from './app/albums/albums.module';
import { ArtistsModule } from './app/artists/artists.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from './app/users/entities/user.entity';
import { Track } from './app/tracks/entities/track.entity';
import { Album } from './app/albums/entities/album.entity';
import { Artist } from './app/artists/entities/artist.entity';
import { Favorites } from './app/favorites/entities/favorites.entity';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
