import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { DatabaseModule } from 'src/database/database.module';
import { Favorites } from './entities/favorites.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => ArtistsModule),
    DatabaseModule,
    TypeOrmModule.forFeature([Favorites]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
