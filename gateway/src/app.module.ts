import { Module } from '@nestjs/common';
import { GatewayController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [GatewayController],
  providers: [AppService],
})
export class AppModule {}
