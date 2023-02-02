import { ArtistModel } from '../models/artist.model';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(artist: ArtistModel) {
    Object.assign(this, artist);
  }
}
