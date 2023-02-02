import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesModel, FavoritesResModel } from './models/favorites.model';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritsService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): FavoritesResModel {
    return this.favoritsService.findAll();
  }

  @Post('/track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritsService.addTrack(id);
  }

  @Post('/album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritsService.addAlbum(id);
  }

  @Post('/artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritsService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): null {
    return this.favoritsService.removeTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): null {
    return this.favoritsService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): null {
    return this.favoritsService.removeArtist(id);
  }
}
