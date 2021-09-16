import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateProductTable1631743876366 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbProducts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'brand',
            type: "varchar"
          }
        ]
      })
    )

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbProducts');
  }

}
