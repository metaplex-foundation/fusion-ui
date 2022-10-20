/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key } from '../types/Key';
import { EscrowConstraint } from '../types/EscrowConstraint';
export declare type EscrowConstraintModelArgs = {
    key: Key;
    name: string;
    constraints: EscrowConstraint[];
    creator: web3.PublicKey;
    updateAuthority: web3.PublicKey;
    count: beet.bignum;
};
export declare class EscrowConstraintModel implements EscrowConstraintModelArgs {
    readonly key: Key;
    readonly name: string;
    readonly constraints: EscrowConstraint[];
    readonly creator: web3.PublicKey;
    readonly updateAuthority: web3.PublicKey;
    readonly count: beet.bignum;
    private constructor();
    static fromArgs(args: EscrowConstraintModelArgs): EscrowConstraintModel;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [EscrowConstraintModel, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<EscrowConstraintModel>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        key: any;
        name: any;
        constraints: any;
        creator: any;
        updateAuthority: any;
        count: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [EscrowConstraintModel, number];
    serialize(): [Buffer, number];
    static byteSize(args: EscrowConstraintModelArgs): number;
    static getMinimumBalanceForRentExemption(args: EscrowConstraintModelArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        key: string;
        name: string;
        constraints: EscrowConstraint[];
        creator: string;
        updateAuthority: string;
        count: number | {
            toNumber: () => number;
        };
    };
}
export declare const escrowConstraintModelBeet: beet.FixableBeetStruct<EscrowConstraintModel, EscrowConstraintModelArgs>;
