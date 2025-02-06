import createToken from "@lib/create-token";
import { describe, expect, test } from "vitest";

describe("createToken", () => {
  test("can create tokens", () => {
    const token = createToken();

    expect(typeof token === "string").toBe(true);
    expect(token.length).toBe(64);
    expect(token).not.toEqual(createToken());
  });
});

describe("authenticateBearer", () => {
  
})
