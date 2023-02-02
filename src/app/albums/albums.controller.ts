import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Put,
  HttpException,
} from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumModel } from './models/album.model';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto): AlbumModel {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): AlbumModel[] {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): AlbumModel {
    const album = this.albumsService.findOne(id);
    if (!album)
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    return album;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): AlbumModel {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): null {
    return this.albumsService.remove(id);
  }
}
