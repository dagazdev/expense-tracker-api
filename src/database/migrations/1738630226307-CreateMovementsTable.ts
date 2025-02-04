import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMovementsTable1738630226307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movements",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "value",
            type: "numeric(9,3)",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "movements",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movements");
  }
}
