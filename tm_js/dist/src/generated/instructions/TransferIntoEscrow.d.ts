import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
import { TransferIntoEscrowArgs } from '../types/TransferIntoEscrowArgs';
export declare type TransferIntoEscrowInstructionArgs = {
    transferIntoEscrowArgs: TransferIntoEscrowArgs;
};
export declare const TransferIntoEscrowStruct: beet.BeetArgsStruct<TransferIntoEscrowInstructionArgs & {
    instructionDiscriminator: number;
}>;
export declare type TransferIntoEscrowInstructionAccounts = {
    escrow: web3.PublicKey;
    payer: web3.PublicKey;
    attributeMint: web3.PublicKey;
    attributeSrc: web3.PublicKey;
    attributeDst: web3.PublicKey;
    attributeMetadata: web3.PublicKey;
    escrowMint: web3.PublicKey;
    escrowAccount: web3.PublicKey;
    systemProgram?: web3.PublicKey;
    ataProgram?: web3.PublicKey;
    tokenProgram?: web3.PublicKey;
    constraintModel: web3.PublicKey;
};
export declare const transferIntoEscrowInstructionDiscriminator = 39;
export declare function createTransferIntoEscrowInstruction(accounts: TransferIntoEscrowInstructionAccounts, args: TransferIntoEscrowInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
