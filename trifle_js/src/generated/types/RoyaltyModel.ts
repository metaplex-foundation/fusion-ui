/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet';
export type RoyaltyModel = {
  createModel: beet.bignum;
  createTrifle: beet.bignum;
  transferIn: beet.bignum;
  transferOut: beet.bignum;
  addConstraint: beet.bignum;
};

/**
 * @category userTypes
 * @category generated
 */
export const royaltyModelBeet = new beet.BeetArgsStruct<RoyaltyModel>(
  [
    ['createModel', beet.u64],
    ['createTrifle', beet.u64],
    ['transferIn', beet.u64],
    ['transferOut', beet.u64],
    ['addConstraint', beet.u64],
  ],
  'RoyaltyModel',
);
