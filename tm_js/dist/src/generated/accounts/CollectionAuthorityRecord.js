"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionAuthorityRecordBeet = exports.CollectionAuthorityRecord = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
class CollectionAuthorityRecord {
    constructor(key, bump) {
        this.key = key;
        this.bump = bump;
    }
    static fromArgs(args) {
        return new CollectionAuthorityRecord(args.key, args.bump);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return CollectionAuthorityRecord.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo == null) {
            throw new Error(`Unable to find CollectionAuthorityRecord account at ${address}`);
        }
        return CollectionAuthorityRecord.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.collectionAuthorityRecordBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.collectionAuthorityRecordBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.collectionAuthorityRecordBeet.serialize(this);
    }
    static get byteSize() {
        return exports.collectionAuthorityRecordBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(CollectionAuthorityRecord.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === CollectionAuthorityRecord.byteSize;
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            bump: this.bump,
        };
    }
}
exports.CollectionAuthorityRecord = CollectionAuthorityRecord;
exports.collectionAuthorityRecordBeet = new beet.BeetStruct([
    ['key', Key_1.keyBeet],
    ['bump', beet.u8],
], CollectionAuthorityRecord.fromArgs, 'CollectionAuthorityRecord');
//# sourceMappingURL=CollectionAuthorityRecord.js.map