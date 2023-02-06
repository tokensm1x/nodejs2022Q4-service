import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateIf,
  Min,
  Max,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(new Date().getFullYear())
  year: number;

  @IsOptional()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
