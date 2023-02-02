import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { InMemoryDB } from 'src/database/in-memory.db';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDB],
  exports: [ArtistsService],
})
export class ArtistsModule {}
