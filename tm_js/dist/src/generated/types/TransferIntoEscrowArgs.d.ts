import * as beet from '@metaplex-foundation/beet';
export declare type TransferIntoEscrowArgs = {
    amount: beet.bignum;
    index: beet.bignum;
};
export declare const transferIntoEscrowArgsBeet: beet.BeetArgsStruct<TransferIntoEscrowArgs>;
