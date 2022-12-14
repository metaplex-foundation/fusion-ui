/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key } from '../types/Key';
import { Data } from '../types/Data';
import { TokenStandard } from '../types/TokenStandard';
import { Collection } from '../types/Collection';
import { Uses } from '../types/Uses';
import { CollectionDetails } from '../types/CollectionDetails';
export declare type MetadataArgs = {
    key: Key;
    updateAuthority: web3.PublicKey;
    mint: web3.PublicKey;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    editionNonce: beet.COption<number>;
    tokenStandard: beet.COption<TokenStandard>;
    collection: beet.COption<Collection>;
    uses: beet.COption<Uses>;
    collectionDetails: beet.COption<CollectionDetails>;
};
export declare class Metadata implements MetadataArgs {
    readonly key: Key;
    readonly updateAuthority: web3.PublicKey;
    readonly mint: web3.PublicKey;
    readonly data: Data;
    readonly primarySaleHappened: boolean;
    readonly isMutable: boolean;
    readonly editionNonce: beet.COption<number>;
    readonly tokenStandard: beet.COption<TokenStandard>;
    readonly collection: beet.COption<Collection>;
    readonly uses: beet.COption<Uses>;
    readonly collectionDetails: beet.COption<CollectionDetails>;
    private constructor();
    static fromArgs(args: MetadataArgs): Metadata;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [Metadata, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<Metadata>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        key: any;
        updateAuthority: any;
        data: any;
        tokenStandard: any;
        collection: any;
        uses: any;
        collectionDetails: any;
        mint: any;
        primarySaleHappened: any;
        isMutable: any;
        editionNonce: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [Metadata, number];
    serialize(): [Buffer, number];
    static byteSize(args: MetadataArgs): number;
    static getMinimumBalanceForRentExemption(args: MetadataArgs, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        key: string;
        updateAuthority: string;
        mint: string;
        data: Data;
        primarySaleHappened: boolean;
        isMutable: boolean;
        editionNonce: number;
        tokenStandard: TokenStandard;
        collection: Collection;
        uses: Uses;
        collectionDetails: {
            __kind: "V1";
        } & {
            size: beet.bignum;
        };
    };
}
export declare const metadataBeet: beet.FixableBeetStruct<Metadata, MetadataArgs>;
