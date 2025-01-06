import { Body, Controller, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { S3Service } from './s3.service';
import { FormDataRequest } from 'nestjs-form-data';
import { ImageDto } from './dto/image.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('image')
export class S3Controller {
    constructor(private readonly s3Service:S3Service){}

    @Post()
    @FormDataRequest()
    @UseGuards(AuthGuard('session'))
    async imageUpload(@Body() dto: ImageDto){
        return {
            url:await this.s3Service.uploadImageFile(dto.image)
        }
    }
}
