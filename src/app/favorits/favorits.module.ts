import { Module } from '@nestjs/common';
import { FavoritsService } from './favorits.service';
import { FavoritsController } from './favorits.controller';

@Module({
  controllers: [FavoritsController],
  providers: [FavoritsService]
})
export class FavoritsModule {}
