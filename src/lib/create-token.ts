import crypto from "node:crypto";

function createToken(): string {
  const entropy = crypto.randomBytes(64).toString("hex");

  const token = crypto.createHash("sha256").update(entropy).digest("hex");

  return token;
}

export default createToken;
