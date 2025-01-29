import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAccessTokensTable1738179121133
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "access_tokens",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "token",
            type: "char",
            length: "64",
          },
          {
            name: "user_id",
            type: "int",
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
      "access_tokens",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const accessTokensTable = await queryRunner.getTable("access_tokens");
    const userForeignKey = accessTokensTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user_id") !== -1
    );

    if (userForeignKey) {
      await queryRunner.dropForeignKey("access_tokens", userForeignKey);
    }

    await queryRunner.dropTable("access_tokens");
  }
}
