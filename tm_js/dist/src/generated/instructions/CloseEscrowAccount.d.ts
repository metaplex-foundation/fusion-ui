import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const CloseEscrowAccountStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number;
}>;
export declare type CloseEscrowAccountInstructionAccounts = {
    escrow: web3.PublicKey;
    metadata: web3.PublicKey;
    mint: web3.PublicKey;
    edition: web3.PublicKey;
    payer: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const closeEscrowAccountInstructionDiscriminator = 38;
export declare function createCloseEscrowAccountInstruction(accounts: CloseEscrowAccountInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
