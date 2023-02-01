import { Injectable } from '@nestjs/common';
import { CreateFavoritDto } from './dto/create-favorit.dto';
import { UpdateFavoritDto } from './dto/update-favorit.dto';

@Injectable()
export class FavoritsService {
  create(createFavoritDto: CreateFavoritDto) {
    return 'This action adds a new favorit';
  }

  findAll() {
    return `This action returns all favorits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorit`;
  }

  update(id: number, updateFavoritDto: UpdateFavoritDto) {
    return `This action updates a #${id} favorit`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorit`;
  }
}
