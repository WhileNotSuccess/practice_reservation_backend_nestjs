//트랜잭션 전용 함수

import { BadRequestException } from "@nestjs/common"
import { DataSource, InsertQueryBuilder, QueryBuilder, QueryRunner } from "typeorm"

/**
 * post, delete, put transaction function
 * @param queryBuilder 
 * not execute(), execute
 */

export async function TransactionFunction(queryBuilder){
    let dataSource:DataSource
    const queryRunner=await this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
        
        await queryRunner.commitTransaction()
        return true
    } catch (e) {
        await queryRunner.rollbackTransaction()
        throw new BadRequestException('error in SQLquery')
    }finally{
        await queryRunner.release()
    }
}