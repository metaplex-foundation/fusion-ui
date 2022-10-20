/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key } from '../types/Key';
export declare type TokenOwnedEscrowArgs = {
    key: Key;
    baseToken: web3.PublicKey;
    tokens: beet.COption<web3.PublicKey>[];
    delegates: web3.PublicKey[];
    model: beet.COption<web3.PublicKey>;
};
export declare class TokenOwnedEscrow implements TokenOwnedEscrowArgs {
    readonly key: Key;
    readonly baseToken: web3.PublicKey;
    readonly tokens: beet.COption<web3.PublicKey>[];
    readonly delegates: web3.PublicKey[];
    readonly model: beet.COption<web3.PublicKey>;
    private constructor();
    static fromArgs(args: TokenOwnedEscrowArgs): TokenOwnedEscrow;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [TokenOwnedEscrow, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<TokenOwnedEscrow>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        key: any;
        baseToken: any;
        tokens: any;
        delegates: any;
        model: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [TokenOwnedEscrow, number];
    serialize(): [Buffer, number];
    static byteSize(args: TokenOwnedEscrowArgs): number;
    static getMinimumBalanceForRentExemption(args: TokenOwnedEscrowArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        key: string;
        baseToken: string;
        tokens: web3.PublicKey[];
        delegates: web3.PublicKey[];
        model: web3.PublicKey;
    };
}
export declare const tokenOwnedEscrowBeet: beet.FixableBeetStruct<TokenOwnedEscrow, TokenOwnedEscrowArgs>;
