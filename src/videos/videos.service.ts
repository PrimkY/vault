import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from "path";
import * as fs from "fs";
import * as uuid from 'uuid';

@Injectable()
export class VideosService {

    async createVideo(file) : Promise<string> {
        try {
            const start = new Date().getTime()
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
                fs.writeFileSync(path.join(filePathBlack, 'error.txt'), 'Произошла ошибка при чтении видео. Видео находится в обработке')
            }
            await fs.writeFileSync(path.join(filePathBlack, fileNameNew + extension), file.buffer);
            await ffmpeg(path.join(filePathBlack, fileNameNew + extension))
                .size('1080x720')
                .save(path.join(filePathWhite, fileNameNew + extension))
                .on('error', (err) => {
                    console.log("Error:" + err.message)
                })
                .on('progress', (progress)=> {
                    console.log(`...frames:` + progress.frames)
                })
                .on('end', ()=> {
                    console.log('Rescaled')
                    this.ClearGarbage()
                    const end = new Date().getTime()
                    console.log('Time for rescaling:' , `${end - start}ms`)
                })
            return fileNameNew + extension
        }
        catch (e) {
            console.log(e)
        }
    }

    async ClearGarbage() {
        const filePathBlack = path.resolve(__dirname, '..', 'garbage');
        await fs.rmSync(filePathBlack, {recursive: true, force: true});
    }

    getVideo(name): string{
        try {
            let string = path.join(__dirname, '..', 'repository', name)
            if (fs.existsSync(path.join(__dirname, '..', 'garbage', 'error.txt'))) {
                string = path.join(__dirname, '..', 'garbage', 'error.txt')
            }
            return string
        }
        catch (e) {
            console.log('this is error:', e, 'this is error name', name)
            throw new HttpException('Произошла ошибка при чтении видео. Видео находится в обработке', HttpStatus.SERVICE_UNAVAILABLE)
        }
    }
}
