import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DataSource } from 'typeorm';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    private readonly dataSource:DataSource,
  ){}
  async create(id:number,date: Date) {
    const queryRunner=await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      await this.dataSource.manager.save(Reservation,{restaurantId:id,date:date})
      await queryRunner.commitTransaction()
      return {message:'생성 완료'}
    } catch (e) {
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
  }

  async findOne(id: number) {
    return await this.dataSource.manager.findBy(Reservation,{restaurantId:id})
  }
}
