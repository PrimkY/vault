import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TransducerModule} from "./transducer/transducer.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'storage')
    }),
    TransducerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
