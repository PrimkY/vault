import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {FilesService} from "../files/files.service";

@Injectable()
export class TransducerService {

    constructor(private readonly filesService: FilesService) {}

  async create(file): Promise<string> {
      try {
          const filename = await this.filesService.createFile(file)
          return filename
      }
      catch (e) {
          throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }
}
