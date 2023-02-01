import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritsService } from './favorits.service';
import { CreateFavoritDto } from './dto/create-favorit.dto';
import { UpdateFavoritDto } from './dto/update-favorit.dto';

@Controller('favorits')
export class FavoritsController {
  constructor(private readonly favoritsService: FavoritsService) {}

  @Post()
  create(@Body() createFavoritDto: CreateFavoritDto) {
    return this.favoritsService.create(createFavoritDto);
  }

  @Get()
  findAll() {
    return this.favoritsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoritDto: UpdateFavoritDto) {
    return this.favoritsService.update(+id, updateFavoritDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritsService.remove(+id);
  }
}
