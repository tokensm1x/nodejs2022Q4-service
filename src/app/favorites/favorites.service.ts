import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ALBUM_NOT_FOUND } from 'src/common/constants/albums';
import { ARTIST_NOT_FOUND } from 'src/common/constants/artists';
import { ADDED_SUCCESSFULLY } from 'src/common/constants/favorites';
import { TRACK_NOT_FOUND } from 'src/common/constants/tracks';
import { throwException } from 'src/common/exceptions/error-handler';
import { InMemoryDB } from 'src/database/in-memory.db';
import { Repository } from 'typeorm';
import { AlbumsService } from '../albums/albums.service';
import { AlbumModel } from '../albums/models/album.model';
import { ArtistsService } from '../artists/artists.service';
import { ArtistModel } from '../artists/models/artist.model';
import { TrackModel } from '../tracks/models/track.model';
import { TracksService } from '../tracks/tracks.service';
import { Favorites } from './entities/favorites.entity';
import { FavoritesResModel, SuccessResponse } from './models/favorites.model';

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
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
  ) {}

  async createRecord(): Promise<Favorites> {
    const favs: Favorites[] = await this.favoritesRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });
    if (!favs.length) {
      const newRecord: Favorites = this.favoritesRepository.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      const savedRecord: Favorites = await this.favoritesRepository.save(
        newRecord,
      );
      return await this.favoritesRepository.findOne({
        where: {
          id: savedRecord.id,
        },
        relations: ['artists', 'tracks', 'albums'],
      });
    } else {
      return favs[0];
    }
  }

  async findAll(): Promise<Favorites> {
    const favs: Favorites = await this.createRecord();
    return favs;
  }

  async addTrack(id): Promise<SuccessResponse> {
    const favs: Favorites = await this.createRecord();
    const track = await this._trackService.findOne(id);
    if (!track)
      throwException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    favs.tracks.push(track);
    await this.favoritesRepository.save(favs);
    return { message: ADDED_SUCCESSFULLY };
  }

  async addAlbum(id): Promise<SuccessResponse> {
    const favs: Favorites = await this.createRecord();
    const album = await this._albumService.findOne(id);
    if (!album)
      throwException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    favs.albums.push(album);
    await this.favoritesRepository.save(favs);
    return { message: ADDED_SUCCESSFULLY };
  }

  async addArtist(id): Promise<SuccessResponse> {
    const favs: Favorites = await this.createRecord();
    const artist = await this._artistService.findOne(id);
    if (!artist)
      throwException(ARTIST_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    favs.artists.push(artist);
    await this.favoritesRepository.save(favs);
    return { message: ADDED_SUCCESSFULLY };
  }

  async removeTrack(id, isDeleted): Promise<null> {
    throwException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
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

  async removeAlbum(id, isDeleted): Promise<null> {
    throwException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
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

  async removeArtist(id, isDeleted): Promise<null> {
    throwException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
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
