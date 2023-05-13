import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {TransducerService} from "./transducer.service";


@Controller('/transducer')
export class TransducerController {

    constructor(private readonly transducerService: TransducerService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@UploadedFile() image) {
        return this.transducerService.create(image)
    }

    @Get()
    getAll() {
        return "just hello"
    }
}
