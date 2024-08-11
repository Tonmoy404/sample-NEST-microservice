import { Module } from '@nestjs/common';
import { ProductController } from './app.controller';
import { ProductService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.NAME,
      entities: [__dirname + '/**/*.entity{.ts, .js}'],
      synchronize: true,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
