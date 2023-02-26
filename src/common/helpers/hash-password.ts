import * as bcrypt from 'bcrypt';
import 'dotenv/config';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, +process.env.CRYPT_SALT);
}

export async function comparePassword(
  password: string,
  currentPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, currentPassword);
}
