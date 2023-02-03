import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackModel } from './models/track.model';
import { v4 as uuid_v4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { throwException } from 'src/common/exceptions/error-handler';
import { TRACK_NOT_FOUND } from 'src/common/constants/tracks';

@Injectable()
export class TracksService {
  constructor(
    private _db: InMemoryDB,
    @Inject(forwardRef(() => FavoritesService))
    private _favsService: FavoritesService,
  ) {}

  create(createTrackDto: CreateTrackDto): TrackModel {
    const track: TrackModel = new Track({
      id: uuid_v4(),
      name: createTrackDto.name,
      albumId: createTrackDto.albumId,
      artistId: createTrackDto.artistId,
      duration: createTrackDto.duration,
    });
    this._db.tracks.push(track);
    return track;
  }

  findAll(): TrackModel[] {
    return this._db.tracks;
  }

  findOne(id: string): TrackModel | null {
    const track: TrackModel | null = this._db.tracks.find(
      (track: TrackModel) => track.id === id,
    );
    if (!track) return null;
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackModel {
    const track: TrackModel | null = this._db.tracks.find(
      (track: TrackModel) => track.id === id,
    );
    if (!track) {
      throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      track.albumId = updateTrackDto.albumId;
      track.artistId = updateTrackDto.artistId;
      track.duration = updateTrackDto.duration;
      track.name = updateTrackDto.name;
      return track;
    }
  }

  remove(id: string): null {
    const trackIndex: number = this._db.tracks.findIndex(
      (track: TrackModel) => track.id === id,
    );
    if (trackIndex < 0) {
      throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      this._favsService.removeTrack(id, true);
      this._db.tracks.splice(trackIndex, 1);
      return null;
    }
  }

  clearAlbums(id: string): void {
    const tracks = this._db.tracks.map((el: TrackModel) => {
      if (el.albumId === id) {
        return {
          ...el,
          albumId: null,
        };
      } else {
        return el;
      }
    });
    this._db.tracks = tracks;
  }

  clearArtists(id: string): void {
    const tracks = this._db.tracks.map((el: TrackModel) => {
      if (el.artistId === id) {
        return {
          ...el,
          artistId: null,
        };
      } else {
        return el;
      }
    });
    this._db.tracks = tracks;
  }
}
