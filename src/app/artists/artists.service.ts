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
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private _albumService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private _trackService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private _favsService: FavoritesService,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistRepository.save({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist | null> {
    const artist: Artist = await this.artistRepository.findOneBy({ id });
    if (!artist) return null;
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const { grammy, name } = updateArtistDto;

    const artist: Artist = await this.findOne(id);

    if (!artist) {
      throwException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      artist.grammy = grammy;
      artist.name = name;
      return await this.artistRepository.save(artist);
    }
  }

  async remove(id: string): Promise<null> {
    const result: DeleteResult = await this.artistRepository.delete({ id });
    if (result.affected) {
      return null;
    } else {
      throwException(ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
