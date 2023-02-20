import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { throwException } from 'src/common/exceptions/error-handler';
import { TRACK_NOT_FOUND } from 'src/common/constants/tracks';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      const track: Track = this.trackRepository.create({
        name: createTrackDto.name,
        duration: createTrackDto.duration,
        artistId: createTrackDto.artistId || null,
        albumId: createTrackDto.albumId || null,
      });
      return await this.trackRepository.save(track);
    } catch (e) {
      throwException('Validation error', 400);
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
    const track: Track | null = await this.findOne(id);
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
        throwException('Validation error', 400);
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
