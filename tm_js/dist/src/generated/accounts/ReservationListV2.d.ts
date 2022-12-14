/// <reference types="node" />
import * as web3 from '@solana/web3.js';
import * as beet from '@metaplex-foundation/beet';
import * as beetSolana from '@metaplex-foundation/beet-solana';
import { Key } from '../types/Key';
import { Reservation } from '../types/Reservation';
export declare type ReservationListV2Args = {
    key: Key;
    masterEdition: web3.PublicKey;
    supplySnapshot: beet.COption<beet.bignum>;
    reservations: Reservation[];
    totalReservationSpots: beet.bignum;
    currentReservationSpots: beet.bignum;
};
export declare class ReservationListV2 implements ReservationListV2Args {
    readonly key: Key;
    readonly masterEdition: web3.PublicKey;
    readonly supplySnapshot: beet.COption<beet.bignum>;
    readonly reservations: Reservation[];
    readonly totalReservationSpots: beet.bignum;
    readonly currentReservationSpots: beet.bignum;
    private constructor();
    static fromArgs(args: ReservationListV2Args): ReservationListV2;
    static fromAccountInfo(accountInfo: web3.AccountInfo<Buffer>, offset?: number): [ReservationListV2, number];
    static fromAccountAddress(connection: web3.Connection, address: web3.PublicKey): Promise<ReservationListV2>;
    static gpaBuilder(programId?: web3.PublicKey): beetSolana.GpaBuilder<{
        key: any;
        masterEdition: any;
        supplySnapshot: any;
        reservations: any;
        totalReservationSpots: any;
        currentReservationSpots: any;
    }>;
    static deserialize(buf: Buffer, offset?: number): [ReservationListV2, number];
    serialize(): [Buffer, number];
    static byteSize(args: ReservationListV2Args): number;
    static getMinimumBalanceForRentExemption(args: ReservationListV2Args, connection: web3.Connection, commitment?: web3.Commitment): Promise<number>;
    pretty(): {
        key: string;
        masterEdition: string;
        supplySnapshot: beet.bignum;
        reservations: Reservation[];
        totalReservationSpots: number | {
            toNumber: () => number;
        };
        currentReservationSpots: number | {
            toNumber: () => number;
        };
    };
}
export declare const reservationListV2Beet: beet.FixableBeetStruct<ReservationListV2, ReservationListV2Args>;
