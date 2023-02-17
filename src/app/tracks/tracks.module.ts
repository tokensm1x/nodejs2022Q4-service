import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  imports: [
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([Track]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
