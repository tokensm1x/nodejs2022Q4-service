import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Put,
  Header,
} from '@nestjs/common';
import { ALBUM_NOT_FOUND } from 'src/common/constants/albums';
import { throwException } from 'src/common/exceptions/error-handler';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumModel } from './models/album.model';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    const album = this.albumsService.findOne(id);
    if (!album) throwException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    return album;
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<null> {
    return this.albumsService.remove(id);
  }
}
