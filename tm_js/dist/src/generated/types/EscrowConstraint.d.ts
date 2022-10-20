import * as beet from '@metaplex-foundation/beet';
import { EscrowConstraintType } from './EscrowConstraintType';
export declare type EscrowConstraint = {
    name: string;
    tokenLimit: beet.bignum;
    constraintType: EscrowConstraintType;
};
export declare const escrowConstraintBeet: beet.FixableBeetArgsStruct<EscrowConstraint>;
