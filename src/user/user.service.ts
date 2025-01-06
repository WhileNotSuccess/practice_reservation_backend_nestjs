import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource:DataSource
  ){}

  async findOne(option:FindManyOptions) {
    return await this.dataSource.manager.findOne(User,option)
  }

  async createUser(user:UserDTO){
    const queryRunner= await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const userInfo=await this.dataSource.manager.save(User,user)
      await queryRunner.commitTransaction()
      return userInfo
    } catch (e) {
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
  }
}
