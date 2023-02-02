import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { InMemoryDB } from 'src/database/in-memory.db';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDB],
  exports: [TracksService],
})
export class TracksModule {}
