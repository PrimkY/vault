import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {TransducerService} from "./transducer.service";
import { Express } from 'express';


@Controller('/transducer')
export class TransducerController {

    constructor(private readonly transducerService: TransducerService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@UploadedFile() image) {
        return this.transducerService.create(image)
    }

    @Post('/video')
    @UseInterceptors(FileInterceptor('file'))
    createVideo(@UploadedFile() file: Express.Multer.File) {
        return this.transducerService.createVideo(file)

    }

    @Get()
    getAll() {
        return "just hello"
    }
}
