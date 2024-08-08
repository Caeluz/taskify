import crypto from "crypto";

export function hashText(
  text: string,
  salt: string = crypto.randomBytes(16).toString("hex")
): { salt: string; hashedPassword: string } {
  const hashedPassword = crypto
    .pbkdf2Sync(text, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt, hashedPassword };
}
