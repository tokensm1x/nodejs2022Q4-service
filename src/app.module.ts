import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TracksModule } from './app/tracks/tracks.module';
import { AlbumsModule } from './app/albums/albums.module';
import { ArtistsModule } from './app/artists/artists.module';
import { FavoritsModule } from './app/favorits/favorits.module';

@Module({
  imports: [UsersModule, TracksModule, AlbumsModule, ArtistsModule, FavoritsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
