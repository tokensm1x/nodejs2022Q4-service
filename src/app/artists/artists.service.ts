import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistModel } from './models/artist.model';
import { v4 as uuid_v4 } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(private _db: InMemoryDB) {}

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
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
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
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    } else {
      this._db.artists.splice(artistIndex, 1);
      return null;
    }
  }
}
