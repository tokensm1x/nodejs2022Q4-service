import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackModel } from './models/track.model';
import { v4 as uuid_v4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { throwException } from 'src/common/exceptions/error-handler';
import { TRACK_NOT_FOUND } from 'src/common/constants/tracks';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private _favsService: FavoritesService,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      const track: Track = this.trackRepository.create({
        name: createTrackDto.name,
        albumId: createTrackDto.albumId || null,
        artistId: createTrackDto.artistId || null,
        duration: createTrackDto.duration,
      });
      return await this.trackRepository.save(track);
    } catch (e) {
      throwException(e, 400);
    }
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track | null> {
    const track: Track | null = await this.trackRepository.findOneBy({ id });
    if (!track) return null;
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track: TrackModel | null = await this.findOne(id);
    if (!track) {
      throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      try {
        track.albumId = updateTrackDto.albumId;
        track.artistId = updateTrackDto.artistId;
        track.duration = updateTrackDto.duration;
        track.name = updateTrackDto.name;
        return await this.trackRepository.save(track);
      } catch (e) {
        throwException(e, 400);
      }
    }
  }

  async remove(id: string): Promise<null> {
    const result: DeleteResult = await this.trackRepository.delete({ id });
    if (result.affected) {
      return null;
    } else {
      throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
