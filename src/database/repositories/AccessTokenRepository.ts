import { PostgresDataSource } from "@database/data-source";
import AccessToken from "@database/entities/AccessToken";
import { Repository } from "typeorm";
import { DataSource } from "typeorm/browser";

class AccessTokenRepository extends Repository<AccessToken> {
  constructor(dataSource?: DataSource) {
    super(
      AccessToken,
      (dataSource || PostgresDataSource).createEntityManager()
    );
  }
}

export default AccessTokenRepository;
