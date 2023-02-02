import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { InMemoryDB } from 'src/database/in-memory.db';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesService)],
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB],
  exports: [AlbumsService],
})
export class AlbumsModule {}
