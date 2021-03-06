import { Address } from '../app.datatypes';

declare var Cipher;

export class CipherProvider {

  generateAddress(seed): Address {
    const address = Cipher.GenerateAddresses(seed);
    return {
      next_seed: address.NextSeed,
      secret_key: address.Secret,
      public_key: address.Public,
      address: address.Address,
    };
  }

  prepareTransaction(inputs: string, outputs: string): string {
    return Cipher.PrepareTransaction(JSON.stringify(inputs), JSON.stringify(outputs));
  }
}
