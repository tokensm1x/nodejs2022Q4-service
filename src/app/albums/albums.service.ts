import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumModel } from './models/album.model';
import { v4 as uuid_v4 } from 'uuid';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumsService {
  constructor(
    private _db: InMemoryDB,
    @Inject(forwardRef(() => TracksService))
    private _trackService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private _favsService: FavoritesService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): AlbumModel {
    const album: AlbumModel = new Album({
      id: uuid_v4(),
      artistId: createAlbumDto.artistId,
      name: createAlbumDto.name,
      year: createAlbumDto.year,
    });
    this._db.albums.push(album);
    return album;
  }

  findAll(): AlbumModel[] {
    return this._db.albums;
  }

  findOne(id: string): AlbumModel | null {
    const album: AlbumModel | null = this._db.albums.find(
      (album: AlbumModel) => album.id === id,
    );
    if (!album) return null;
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumModel {
    const { name, year, artistId } = updateAlbumDto;
    const album: AlbumModel | null = this._db.albums.find(
      (album: AlbumModel) => album.id === id,
    );
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    } else {
      album.name = name;
      album.year = year;
      album.artistId = artistId;
      return album;
    }
  }

  remove(id: string): null {
    const albumIndex: number = this._db.albums.findIndex(
      (album: AlbumModel) => album.id === id,
    );
    if (albumIndex < 0) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    } else {
      this._trackService.clearAlbums(id);
      this._favsService.clearAlbums(id);
      this._db.artists.splice(albumIndex, 1);
      return null;
    }
  }
}
