import { PartialType } from '@nestjs/swagger';
import { CreateFavoritDto } from './create-favorit.dto';

export class UpdateFavoritDto extends PartialType(CreateFavoritDto) {}
