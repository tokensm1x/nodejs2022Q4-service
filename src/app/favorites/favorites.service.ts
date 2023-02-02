import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { AlbumsService } from '../albums/albums.service';
import { AlbumModel } from '../albums/models/album.model';
import { ArtistsService } from '../artists/artists.service';
import { ArtistModel } from '../artists/models/artist.model';
import { TrackModel } from '../tracks/models/track.model';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesModel, FavoritesResModel } from './models/favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    private _db: InMemoryDB,
    @Inject(forwardRef(() => ArtistsService))
    private _artistService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private _trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private _albumService: AlbumsService,
  ) {}

  findAll(): FavoritesResModel {
    const albums: AlbumModel[] = this._db.albums.filter((el: AlbumModel) =>
      this._db.favorites.albums.includes(el.id),
    );
    const artists: ArtistModel[] = this._db.artists.filter((el: ArtistModel) =>
      this._db.favorites.artists.includes(el.id),
    );
    const tracks: TrackModel[] = this._db.tracks.filter((el: TrackModel) =>
      this._db.favorites.tracks.includes(el.id),
    );
    return {
      albums,
      tracks,
      artists,
    };
  }

  addTrack(id) {
    const track = this._trackService.findOne(id);
    if (!track)
      throw new HttpException(
        'Track not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this._db.favorites.tracks.push(track.id);
    return { message: 'Added successfully' };
  }

  addAlbum(id) {
    const album = this._albumService.findOne(id);
    if (!album)
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this._db.favorites.albums.push(album.id);
    return { message: 'Added successfully' };
  }

  addArtist(id) {
    const artist = this._artistService.findOne(id);
    if (!artist)
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    this._db.favorites.artists.push(artist.id);
    return { message: 'Added successfully' };
  }

  removeTrack(id): null {
    return null;
  }

  removeAlbum(id): null {
    return null;
  }

  removeArtist(id): null {
    return null;
  }

  clearAlbums(id: string) {
    this._db.favorites.albums = this._db.favorites.albums.filter(
      (el: string) => {
        return id !== el;
      },
    );
  }
}
