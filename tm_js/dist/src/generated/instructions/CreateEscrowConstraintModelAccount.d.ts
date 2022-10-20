import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { CreateEscrowConstraintModelAccountArgs } from '../types/CreateEscrowConstraintModelAccountArgs';
export declare type CreateEscrowConstraintModelAccountInstructionArgs = {
    createEscrowConstraintModelAccountArgs: CreateEscrowConstraintModelAccountArgs;
};
export declare const CreateEscrowConstraintModelAccountStruct: beet.FixableBeetArgsStruct<CreateEscrowConstraintModelAccountInstructionArgs & {
    instructionDiscriminator: number;
}>;
export declare type CreateEscrowConstraintModelAccountInstructionAccounts = {
    escrowConstraintModel: web3.PublicKey;
    payer: web3.PublicKey;
    updateAuthority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const createEscrowConstraintModelAccountInstructionDiscriminator = 41;
export declare function createCreateEscrowConstraintModelAccountInstruction(accounts: CreateEscrowConstraintModelAccountInstructionAccounts, args: CreateEscrowConstraintModelAccountInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
