import {Controller, Get, Param, StreamableFile} from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";
import {VideosService} from "./videos.service";


@Controller('/video')
export class VideosController {

    constructor(private readonly videosService: VideosService) {}

    @Get('/:name')
    getVideo(@Param('name') name: string): StreamableFile {
        const path = this.videosService.getVideo(name)
        const file = createReadStream(join(`${path}`));
        return new StreamableFile(file);
    }
}
