import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService){}
  
    
    async validateUser(user:UserDTO){
      let findUser=await this.userService.findOne({where:{googleId:user.googleId}})
      if(!findUser){
        findUser = await this.userService.createUser(user)
      }
      return findUser
    }
}
