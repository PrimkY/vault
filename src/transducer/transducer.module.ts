import {Module} from "@nestjs/common";
import {TransducerService} from "./transducer.service";
import {TransducerController} from "./transducer.controller";
import {FilesModule} from "../files/files.module";

@Module({
    providers:[TransducerService],
    controllers:[TransducerController],
    imports: [FilesModule]
})
export class TransducerModule {}
