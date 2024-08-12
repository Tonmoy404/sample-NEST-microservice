import { Module } from '@nestjs/common';
import { GatewayController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, ClientModule],
  controllers: [GatewayController],
  providers: [AppService],
})
export class AppModule {}
