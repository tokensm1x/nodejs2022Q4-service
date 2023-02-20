import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ALBUM_NOT_FOUND } from 'src/common/constants/albums';
import { ARTIST_NOT_FOUND } from 'src/common/constants/artists';
import { ADDED_SUCCESSFULLY } from 'src/common/constants/favorites';
import { TRACK_NOT_FOUND } from 'src/common/constants/tracks';
import { throwException } from 'src/common/exceptions/error-handler';
import { Repository } from 'typeorm';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Track } from '../tracks/entities/track.entity';
import { Favorites } from './entities/favorites.entity';
import { SuccessResponse } from './models/favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
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
    const track: Track = await this.tracksRepository.findOneBy({ id });
    if (!track)
      throwException(TRACK_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    favs.tracks.push(track);
    await this.favoritesRepository.save(favs);
    return { message: ADDED_SUCCESSFULLY };
  }

  async addAlbum(id): Promise<SuccessResponse> {
    const favs: Favorites = await this.createRecord();
    const album: Album = await this.albumsRepository.findOneBy({ id });
    if (!album)
      throwException(ALBUM_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    favs.albums.push(album);
    await this.favoritesRepository.save(favs);
    return { message: ADDED_SUCCESSFULLY };
  }

  async addArtist(id): Promise<SuccessResponse> {
    const favs: Favorites = await this.createRecord();
    const artist: Artist = await this.artistsRepository.findOneBy({ id });
    if (!artist)
      throwException(ARTIST_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    favs.artists.push(artist);
    await this.favoritesRepository.save(favs);
    return { message: ADDED_SUCCESSFULLY };
  }

  async removeTrack(id): Promise<null> {
    const favs: Favorites = await this.createRecord();
    const track: Track = favs.tracks.find((el: Track) => el.id === id);
    if (!track) {
      throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      favs.tracks = favs.tracks.filter((el: Track) => el.id !== id);
      await this.favoritesRepository.save(favs);
      return null;
    }

    // const trackIndex: number = this._db.favorites.tracks.findIndex(
    //   (track: string) => track === id,
    // );
    // if (trackIndex < 0 && !isDeleted) {
    //   throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    // } else if (trackIndex >= 0) {
    //   this._db.favorites.tracks.splice(trackIndex, 1);
    // }
    // return null;
  }

  async removeAlbum(id): Promise<null> {
    const favs: Favorites = await this.createRecord();
    const album: Album = favs.albums.find((el: Album) => el.id === id);
    if (!album) {
      throwException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      favs.albums = favs.albums.filter((el: Album) => el.id !== id);
      await this.favoritesRepository.save(favs);
      return null;
    }
  }

  async removeArtist(id): Promise<null> {
    const favs: Favorites = await this.createRecord();
    const artist: Artist = favs.artists.find((el: Artist) => el.id === id);
    if (!artist) {
      throwException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      favs.artists = favs.artists.filter((el: Artist) => el.id !== id);
      await this.favoritesRepository.save(favs);
      return null;
    }
  }
}
