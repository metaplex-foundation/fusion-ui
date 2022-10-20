import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { AddConstraintToEscrowConstraintModelArgs } from '../types/AddConstraintToEscrowConstraintModelArgs';
export declare type AddConstraintToEscrowConstraintModelInstructionArgs = {
    addConstraintToEscrowConstraintModelArgs: AddConstraintToEscrowConstraintModelArgs;
};
export declare const AddConstraintToEscrowConstraintModelStruct: beet.FixableBeetArgsStruct<AddConstraintToEscrowConstraintModelInstructionArgs & {
    instructionDiscriminator: number;
}>;
export declare type AddConstraintToEscrowConstraintModelInstructionAccounts = {
    escrowConstraintModel: web3.PublicKey;
    payer: web3.PublicKey;
    updateAuthority: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const addConstraintToEscrowConstraintModelInstructionDiscriminator = 42;
export declare function createAddConstraintToEscrowConstraintModelInstruction(accounts: AddConstraintToEscrowConstraintModelInstructionAccounts, args: AddConstraintToEscrowConstraintModelInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
