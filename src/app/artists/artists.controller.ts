import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  HttpException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistModel } from './models/artist.model';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createArtistDto: CreateArtistDto): ArtistModel {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): ArtistModel[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist)
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    return artist;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.remove(id);
  }
}
