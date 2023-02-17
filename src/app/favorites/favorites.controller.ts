import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Header,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResModel, SuccessResponse } from './models/favorites.model';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<any> {
    return this.favoritesService.findAll();
  }

  @Post('/track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): SuccessResponse {
    return this.favoritesService.addTrack(id);
  }

  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): SuccessResponse {
    return this.favoritesService.addAlbum(id);
  }

  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): SuccessResponse {
    return this.favoritesService.addArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): null {
    return this.favoritesService.removeTrack(id, false);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): null {
    return this.favoritesService.removeAlbum(id, false);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): null {
    return this.favoritesService.removeArtist(id, false);
  }
}
