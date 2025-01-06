import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DataSource } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { TransactionFunction } from 'src/common/transaction';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly dataSource:DataSource
  ){}
  async create(
    createRestaurantDto: CreateRestaurantDto,
  ) {
    const queryRunner=await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await this.dataSource.manager.save(Restaurant,createRestaurantDto)
      await queryRunner.commitTransaction()
      return {message:'추가 완료'}
    } catch (e) {
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
  }

  async findAll() {
    const queryBuilder=this.dataSource.createQueryBuilder()
    queryBuilder.select('res.id,res.name,res.thumbnail').from(Restaurant,'res')
    return await queryBuilder.getMany()
  }

  async findOne(id: number) {
    return await this.dataSource.manager.findOneBy(Restaurant,{id})
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const queryRunner= await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await this.dataSource.manager.update(Restaurant,id,updateRestaurantDto)
      await queryRunner.commitTransaction()
      return {message:'수정 완료'}
    } catch (e) {
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
  }

  async remove(id: number) {
    const queryRunner= await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await this.dataSource.manager.delete(Restaurant,id)
      await queryRunner.commitTransaction()
      return {message:'삭제 완료'}
    } catch (e) {
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
  }
}
