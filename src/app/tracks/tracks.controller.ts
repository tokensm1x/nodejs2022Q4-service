import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Put,
  HttpException,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackModel } from './models/track.model';
import { TRACK_NOT_FOUND } from 'src/common/constants/tracks';
import { throwException } from 'src/common/exceptions/error-handler';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): TrackModel[] {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): TrackModel {
    const track = this.tracksService.findOne(id);
    if (!track) throwException(TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    return track;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(ValidationPipe) updateTrackDto: UpdateTrackDto,
  ): TrackModel {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): null {
    return this.tracksService.remove(id);
  }
}
