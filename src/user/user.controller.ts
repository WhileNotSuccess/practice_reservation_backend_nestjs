import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from "@nestjs/passport";


@Controller('user')
export class UserController{
    constructor(private readonly UserService:UserService){}

    @Get('info')
    @UseGuards(AuthGuard('session'))
    getInfo(@Req() req){
        return req.user
    }
}