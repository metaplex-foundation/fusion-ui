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
exports.useAuthorityRecordBeet = exports.UseAuthorityRecord = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
class UseAuthorityRecord {
    constructor(key, allowedUses, bump) {
        this.key = key;
        this.allowedUses = allowedUses;
        this.bump = bump;
    }
    static fromArgs(args) {
        return new UseAuthorityRecord(args.key, args.allowedUses, args.bump);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return UseAuthorityRecord.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo == null) {
            throw new Error(`Unable to find UseAuthorityRecord account at ${address}`);
        }
        return UseAuthorityRecord.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.useAuthorityRecordBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.useAuthorityRecordBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.useAuthorityRecordBeet.serialize(this);
    }
    static get byteSize() {
        return exports.useAuthorityRecordBeet.byteSize;
    }
    static async getMinimumBalanceForRentExemption(connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(UseAuthorityRecord.byteSize, commitment);
    }
    static hasCorrectByteSize(buf, offset = 0) {
        return buf.byteLength - offset === UseAuthorityRecord.byteSize;
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            allowedUses: (() => {
                const x = this.allowedUses;
                if (typeof x.toNumber === 'function') {
                    try {
                        return x.toNumber();
                    }
                    catch (_) {
                        return x;
                    }
                }
                return x;
            })(),
            bump: this.bump,
        };
    }
}
exports.UseAuthorityRecord = UseAuthorityRecord;
exports.useAuthorityRecordBeet = new beet.BeetStruct([
    ['key', Key_1.keyBeet],
    ['allowedUses', beet.u64],
    ['bump', beet.u8],
], UseAuthorityRecord.fromArgs, 'UseAuthorityRecord');
//# sourceMappingURL=UseAuthorityRecord.js.map