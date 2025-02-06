import { PostgresDataSource } from "@database/data-source";
import Movement from "@database/entities/Movement";
import { Repository } from "typeorm";
import { DataSource } from "typeorm/browser";

class MovementRepository extends Repository<Movement> {
  constructor(dataSource?: DataSource) {
    super(Movement, (dataSource || PostgresDataSource).createEntityManager());
  }
}

export default MovementRepository;
