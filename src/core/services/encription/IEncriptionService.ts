export default interface IEncriptionService {
  decrypt: (hash: string) => string;
  generateHash: (data: string) => string;
  compareHash: (val1: string, val2: string) => boolean;
}
