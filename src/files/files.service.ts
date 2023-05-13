import {Injectable} from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp'

@Injectable()
export class FilesService {

    async createFile(file) : Promise<string>{
        try {
            const fileNameOrigin = file.originalname
            const extension = fileNameOrigin.split('.').reverse()[0]
            const fileNameNew = uuid.v4() + `.${extension}`;
            const filePathWhite = path.resolve(__dirname, '..', 'storage')
            if (!fs.existsSync(filePathWhite)) {
                fs.mkdirSync(filePathWhite, {recursive: true})
            }
            await sharp(file.buffer)
                    .resize(600,600, {
                        fit: "fill"
                    })
                    .toFile(filePathWhite + '/' + fileNameNew)
            return fileNameNew
        } catch (e) {
            console.log(e)
        }
    }
}
