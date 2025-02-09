import "reflect-metadata";
import User from "@database/entities/User";
import UserRepository from "@database/repositories/UserRepository";
import createToken from "@lib/create-token";
import { createInMemoryDatabase } from "../helpers";

describe("createToken", () => {
  test("can create tokens", () => {
    const token = createToken();

    expect(typeof token === "string").toBe(true);
    expect(token.length).toBe(64);
    expect(token).not.toEqual(createToken());
  });
});

describe("authenticateBearer", () => {
  const inMemoryDatabase = createInMemoryDatabase();

  beforeEach(async () => {
    await inMemoryDatabase.initialize();
  });

  afterAll(async () => {
    await inMemoryDatabase.destroy();
  });

  test("can authenticate user", async () => {
    const user = new User();
    user.name = "foo";
    user.password = "pass123";

    const userRepo = new UserRepository(inMemoryDatabase.datasource);

    await userRepo.save(user);

    const storedUser = (await userRepo.find())[0];
    
    expect(storedUser.name).toBe(user.name);
    expect(storedUser.password).toBe(user.password);
  });
});
