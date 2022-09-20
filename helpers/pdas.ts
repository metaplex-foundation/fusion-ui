import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ADDRESS } from '../js/src/generated';

export const findToePda = async (mint: PublicKey) => {
    return await PublicKey.findProgramAddress(
        [
            Buffer.from('metadata'),
            new PublicKey(PROGRAM_ADDRESS).toBuffer(),
            mint.toBuffer(),
            Buffer.from('escrow'),
        ],
        new PublicKey(PROGRAM_ADDRESS)
      );
}