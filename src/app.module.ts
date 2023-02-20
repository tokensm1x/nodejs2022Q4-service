import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TracksModule } from './app/tracks/tracks.module';
import { AlbumsModule } from './app/albums/albums.module';
import { ArtistsModule } from './app/artists/artists.module';
import { FavoritesModule } from './app/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { dataSourceOptions } from 'src/data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
    FavoritesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
