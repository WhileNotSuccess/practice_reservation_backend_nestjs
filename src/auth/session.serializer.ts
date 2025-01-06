import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "src/user/user.service";

export class SessionSerializer extends PassportSerializer{
    constructor(private readonly userService:UserService){
        super();
    }

    serializeUser(user: any, done: Function) {
        done(null,user)
    }

    async deserializeUser(user: any, done: Function) {
        const userDB = await this.userService.findOne({where:{googleId:user.googleId}})
        return userDB ? done(null,userDB) : done(null,null)
    }
}