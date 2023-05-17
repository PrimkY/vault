import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {FilesService} from "../files/files.service";
import {VideosService} from "../videos/videos.service";

@Injectable()
export class TransducerService {

    constructor(private readonly filesService: FilesService,
                private readonly videosService: VideosService) {}

  async create(file): Promise<string> {
      try {
          const filename = await this.filesService.createFile(file)
          return filename
      }
      catch (e) {
          throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }

  async createVideo(file): Promise<string> {
      try {
          const filename = await this.videosService.createVideo(file)
          return filename
      }
      catch (e) {
          throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }
}
