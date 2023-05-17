import {Module} from "@nestjs/common";
import {TransducerService} from "./transducer.service";
import {TransducerController} from "./transducer.controller";
import {FilesModule} from "../files/files.module";
import {VideosModule} from "../videos/videos.module";

@Module({
    providers:[TransducerService],
    controllers:[TransducerController],
    imports: [FilesModule, VideosModule]
})
export class TransducerModule {}
