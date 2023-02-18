import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { ALBUM_NOT_FOUND } from 'src/common/constants/albums';
import { throwException } from 'src/common/exceptions/error-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const album: Album = this.albumRepository.create({
        artistId: createAlbumDto.artistId || null,
        name: createAlbumDto.name,
        year: createAlbumDto.year,
      });
      return await this.albumRepository.save(album);
    } catch (e) {
      throwException(e, 400);
    }
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album | null> {
    const album: Album | null = await this.albumRepository.findOneBy({ id });
    if (!album) throwException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const { name, year, artistId } = updateAlbumDto;
    const album: Album | null = await this.findOne(id);
    if (!album) {
      throwException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      try {
        album.name = name;
        album.year = year;
        album.artistId = artistId;
        return await this.albumRepository.save(album);
      } catch (e) {
        throwException(e, 400);
      }
    }
  }

  async remove(id: string): Promise<null> {
    const result: DeleteResult = await this.albumRepository.delete({ id });
    if (result.affected) {
      return null;
    } else {
      throwException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    // const albumIndex: number = this._db.albums.findIndex(
    //   (album: AlbumModel) => album.id === id,
    // );
    // if (albumIndex < 0) {
    //   throwException(ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    // } else {
    //   this._trackService.clearAlbums(id);
    //   this._favsService.removeAlbum(id, true);
    //   this._db.albums.splice(albumIndex, 1);
    //   return null;
    // }
  }

  // clearArtists(id: string): void {
  //   const albums = this._db.albums.map((el: AlbumModel) => {
  //     if (el.artistId === id) {
  //       return {
  //         ...el,
  //         artistId: null,
  //       };
  //     } else {
  //       return el;
  //     }
  //   });
  //   this._db.albums = albums;
  // }
}
