import { AlbumModel } from '../models/album.model';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(album: AlbumModel) {
    Object.assign(this, album);
  }
}
