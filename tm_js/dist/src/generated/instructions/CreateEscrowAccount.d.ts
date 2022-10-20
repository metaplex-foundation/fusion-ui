import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const CreateEscrowAccountStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number;
}>;
export declare type CreateEscrowAccountInstructionAccounts = {
    escrow: web3.PublicKey;
    metadata: web3.PublicKey;
    mint: web3.PublicKey;
    edition: web3.PublicKey;
    payer: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    escrowConstraintModel?: web3.PublicKey;
};
export declare const createEscrowAccountInstructionDiscriminator = 37;
export declare function createCreateEscrowAccountInstruction(accounts: CreateEscrowAccountInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
