import * as beet from '@metaplex-foundation/beet';
export declare enum EscrowConstraintType {
    None = 0,
    Collection = 1,
    Tokens = 2
}
export declare const escrowConstraintTypeBeet: beet.FixedSizeBeet<EscrowConstraintType, EscrowConstraintType>;
