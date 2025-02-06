import { PostgresDataSource } from "@database/data-source";
import User from "@database/entities/User";
import { Repository } from "typeorm";
import { DataSource } from "typeorm/browser";

class UserRepository extends Repository<User> {
  constructor(dataSource?: DataSource) {
    super(User, (dataSource || PostgresDataSource).createEntityManager());
  }
}

export default UserRepository;
