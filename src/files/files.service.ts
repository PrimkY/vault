import {Injectable} from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp'

@Injectable()
export class FilesService {

    async createFile(file) : Promise<string>{
        try {
            const size = [250, 700, 1000]
            const fileNameOrigin = file.originalname
            const extension = fileNameOrigin.split('.').reverse()[0]
            const fileNameNew = uuid.v4();
            const filePathWhite = path.resolve(__dirname, '..', 'storage')
            if (!fs.existsSync(filePathWhite)) {
                fs.mkdirSync(filePathWhite, {recursive: true})
            }
            await size.forEach((wl)=> {
                 fs.mkdirSync(filePathWhite + '/' + fileNameNew, {recursive: true})
                 sharp(file.buffer)
                    .resize(wl,wl, {
                        fit: "fill"
                    })
                    .toFile(filePathWhite + '/' + fileNameNew + '/' + `${wl}` + `.${extension}`)
            })
            return fileNameNew
        } catch (e) {
            console.log(e)
        }
    }
}
