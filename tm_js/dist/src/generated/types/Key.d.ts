import * as beet from '@metaplex-foundation/beet';
export declare enum Key {
    Uninitialized = 0,
    EditionV1 = 1,
    MasterEditionV1 = 2,
    ReservationListV1 = 3,
    MetadataV1 = 4,
    ReservationListV2 = 5,
    MasterEditionV2 = 6,
    EditionMarker = 7,
    UseAuthorityRecord = 8,
    CollectionAuthorityRecord = 9,
    TokenOwnedEscrow = 10,
    EscrowConstraintModel = 11
}
export declare const keyBeet: beet.FixedSizeBeet<Key, Key>;
