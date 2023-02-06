import { TrackModel } from '../models/track.model';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  constructor(track: TrackModel) {
    Object.assign(this, track);
  }
}
