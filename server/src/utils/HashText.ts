import crypto from "crypto";

const salt = crypto.randomBytes(16).toString("hex");
export function hashText(text: string): string {
  const hashedPassword = crypto
    .pbkdf2Sync(text, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hashedPassword;
}
