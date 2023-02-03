import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ALBUM_NOT_FOUND } from 'src/common/constants/albums';
import { ARTIST_NOT_FOUND } from 'src/common/constants/artists';
import { ADDED_SUCCESSFULLY } from 'src/common/constants/favorites';
import { TRACK_NOT_FOUND } from 'src/common/constants/tracks';
import { throwException } from 'src/common/exceptions/error-handler';
import { InMemoryDB } from 'src/database/in-memory.db';
import { AlbumsService } from '../albums/albums.service';
import { AlbumModel } from '../albums/models/album.model';
import { ArtistsService } from '../artists/artists.service';
import { ArtistModel } from '../artists/models/artist.model';
import { TrackModel } from '../tracks/models/track.model';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesResModel } from './models/favorites.model';

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
      throwException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    this._db.favorites.tracks.push(track.id);
    return { message: ADDED_SUCCESSFULLY };
  }

  addAlbum(id) {
    const album = this._albumService.findOne(id);
    if (!album)
      throwException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    this._db.favorites.albums.push(album.id);
    return { message: ADDED_SUCCESSFULLY };
  }

  addArtist(id) {
    const artist = this._artistService.findOne(id);
    if (!artist)
      throwException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    this._db.favorites.artists.push(artist.id);
    return { message: ADDED_SUCCESSFULLY };
  }

  removeTrack(id, isDeleted): null {
    const trackIndex: number = this._db.favorites.tracks.findIndex(
      (track: string) => track === id,
    );
    if (trackIndex < 0 && !isDeleted) {
      throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else if (trackIndex >= 0) {
      this._db.favorites.tracks.splice(trackIndex, 1);
    }
    return null;
  }

  removeAlbum(id, isDeleted): null {
    const albumIndex: number = this._db.favorites.albums.findIndex(
      (album: string) => album === id,
    );
    if (albumIndex < 0 && !isDeleted) {
      throwException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else if (albumIndex >= 0) {
      this._db.favorites.albums.splice(albumIndex, 1);
    }
    return null;
  }

  removeArtist(id, isDeleted): null {
    const artistIndex: number = this._db.favorites.artists.findIndex(
      (artist: string) => artist === id,
    );
    if (artistIndex < 0 && !isDeleted) {
      throwException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else if (artistIndex >= 0) {
      this._db.favorites.artists.splice(artistIndex, 1);
    }
    return null;
  }
}
