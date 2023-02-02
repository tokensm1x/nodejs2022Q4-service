import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TracksModule } from './app/tracks/tracks.module';
import { AlbumsModule } from './app/albums/albums.module';
import { ArtistsModule } from './app/artists/artists.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { DatabaseModule } from './database/database.module';
import { InMemoryDB } from './database/in-memory.db';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
