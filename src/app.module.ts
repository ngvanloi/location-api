import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'orm.config';
import { LocationModule } from './location/location.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
