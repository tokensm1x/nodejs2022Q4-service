import { forwardRef, Inject, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { InMemoryDB } from 'src/database/in-memory.db';
import { TracksService } from '../tracks/tracks.service';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, InMemoryDB],
  exports: [FavoritesService],
})
export class FavoritesModule {}
