import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from '../tracks/tracks.module';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Album]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
