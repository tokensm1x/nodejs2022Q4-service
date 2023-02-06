import { Injectable } from '@nestjs/common';
import { AlbumModel } from 'src/app/albums/models/album.model';
import { ArtistModel } from 'src/app/artists/models/artist.model';
import { FavoritesModel } from 'src/app/favorites/models/favorites.model';
import { TrackModel } from 'src/app/tracks/models/track.model';
import { UserModel } from 'src/app/users/models/user.model';

@Injectable()
export class InMemoryDB {
  public users: UserModel[] = [];
  public tracks: TrackModel[] = [];
  public artists: ArtistModel[] = [];
  public albums: AlbumModel[] = [];
  public favorites: FavoritesModel = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
