import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistModel } from './models/artist.model';
import { v4 as uuid_v4 } from 'uuid';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { ARTIST_NOT_FOUND } from 'src/common/constants/artists';
import { throwException } from 'src/common/exceptions/error-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    private _db: InMemoryDB,
    @Inject(forwardRef(() => AlbumsService))
    private _albumService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private _trackService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private _favsService: FavoritesService,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  create(createArtistDto: CreateArtistDto): ArtistModel {
    const artist: ArtistModel = new Artist({
      id: uuid_v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    this._db.artists.push(artist);
    return artist;
  }

  findAll(): ArtistModel[] {
    return this._db.artists;
  }

  findOne(id: string): ArtistModel | null {
    const artist: ArtistModel | null = this._db.artists.find(
      (artist: ArtistModel) => artist.id === id,
    );
    if (!artist) return null;

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistModel {
    const { grammy, name } = updateArtistDto;
    const artist: ArtistModel | null = this._db.artists.find(
      (artist: ArtistModel) => artist.id === id,
    );
    if (!artist) {
      throwException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      artist.grammy = grammy;
      artist.name = name;
      return artist;
    }
  }

  remove(id: string): null {
    const artistIndex: number = this._db.artists.findIndex(
      (artist: ArtistModel) => artist.id === id,
    );
    if (artistIndex < 0) {
      throwException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      this._albumService.clearArtists(id);
      this._trackService.clearArtists(id);
      this._favsService.removeArtist(id, true);
      this._db.artists.splice(artistIndex, 1);
      return null;
    }
  }
}
