import * as bcrypt from 'bcrypt';
import 'dotenv/config';

export async function hashPassword(password): Promise<string> {
  return await bcrypt.hash(password, +process.env.CRYPT_SALT);
}
