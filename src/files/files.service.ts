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
            const filePathBlack = path.resolve(__dirname, '..', 'garbage')
            const filePathWhite = path.resolve(__dirname, '..', 'storage')
            if (!fs.existsSync(filePathBlack || filePathWhite)) {
                fs.mkdirSync(filePathBlack, {recursive: true})
                fs.mkdirSync(filePathWhite, {recursive: true})
            }
            await fs.writeFileSync(path.join(filePathBlack, fileNameNew), file.buffer)
            await sharp(path.join(filePathBlack, fileNameNew))
                    .resize(600,600, {
                        fit: "fill"
                    })
                    .toFile(filePathWhite + '/' + fileNameNew)
            await fs.rmSync(filePathBlack, { recursive: true, force: true})
            return fileNameNew
        } catch (e) {
            console.log(e)
        }
    }
}
