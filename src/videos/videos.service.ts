import {Injectable} from "@nestjs/common";
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from "path";
import * as fs from "fs";
import * as uuid from 'uuid';

@Injectable()
export class VideosService {

    async createVideo(file) : Promise<string> {
        try {
            const fileNameOrigin = file.originalname
            const extension = '.' + fileNameOrigin.split('.').reverse()[0]
            const fileNameNew = uuid.v4();
            const filePathWhite = path.resolve(__dirname, '..', 'repository')
            const filePathBlack = path.resolve(__dirname, '..', 'garbage')
            if (!fs.existsSync(filePathWhite)) {
                fs.mkdirSync(filePathWhite, {recursive: true})
            }
            if (!fs.existsSync(filePathBlack)) {
                fs.mkdirSync(filePathBlack, {recursive: true})
            }
            await fs.writeFileSync(path.join(filePathBlack, fileNameNew + extension), file.buffer);
            await ffmpeg(path.join(filePathBlack, fileNameNew + extension))
                .size('1080x720')
                .videoBitrate('800k')
                .save(path.join(filePathWhite, fileNameNew + extension))
                .on('end', ()=> {
                    console.log('Rescaled')
                })
                .on('error', (err) => {
                    console.log("Error:" + err.message)
                })
            return fileNameNew
        }
        catch (e) {
            console.log(e)
        }
    }

    async ClearGarbage() {
        const filePathBlack = path.resolve(__dirname, '..', 'garbage')
        await fs.rmSync(filePathBlack, {recursive: true, force: true})
    }
}
