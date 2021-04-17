import IEncriptionService from '@core/services/encription/IEncriptionService';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import config from '../../../config';

const saltRounds = 10;

export default class EncriptionService implements IEncriptionService {
  decrypt(hash: string): string {
    const { cryptoKey, cryptoIv } = config;
    const encryptedText = Buffer.from(hash, 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      cryptoKey,
      cryptoIv,
    );
    let decrypted = decipher.update(encryptedText);
    return decrypted.toString();
  }

  generateHash(data: string): string {
    const result = bcrypt.hashSync(data, saltRounds);
    return result;
  }

  compareHash(val1: string, val2: string): boolean {
    const result = bcrypt.compareSync(val1, val2);
    return result;
  }
}
