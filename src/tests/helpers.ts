import path from "node:path";
import { Database } from "sqlite3";
import { DataSource } from "typeorm";

export function createInMemoryDatabase() {
  let db: Database;

  const sqliteDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: [path.resolve(__dirname, "../database/entities/*.{ts,js}")],
    synchronize: true,
  });

  async function initialize() {
    db = new Database(":memory:");
    await sqliteDataSource.initialize();
  }

  async function destroy() {
    await sqliteDataSource.destroy();
    db.close();
  }

  return {
    datasource: sqliteDataSource,
    initialize,
    destroy,
  };
}
