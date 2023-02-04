import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  Min,
  Max,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;

  @IsInt()
  @Min(0)
  @Max(1000)
  duration: number; // integer number
}
