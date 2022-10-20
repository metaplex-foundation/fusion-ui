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
exports.escrowConstraintModelBeet = exports.EscrowConstraintModel = void 0;
const web3 = __importStar(require("@solana/web3.js"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const beetSolana = __importStar(require("@metaplex-foundation/beet-solana"));
const Key_1 = require("../types/Key");
const EscrowConstraint_1 = require("../types/EscrowConstraint");
class EscrowConstraintModel {
    constructor(key, name, constraints, creator, updateAuthority, count) {
        this.key = key;
        this.name = name;
        this.constraints = constraints;
        this.creator = creator;
        this.updateAuthority = updateAuthority;
        this.count = count;
    }
    static fromArgs(args) {
        return new EscrowConstraintModel(args.key, args.name, args.constraints, args.creator, args.updateAuthority, args.count);
    }
    static fromAccountInfo(accountInfo, offset = 0) {
        return EscrowConstraintModel.deserialize(accountInfo.data, offset);
    }
    static async fromAccountAddress(connection, address) {
        const accountInfo = await connection.getAccountInfo(address);
        if (accountInfo == null) {
            throw new Error(`Unable to find EscrowConstraintModel account at ${address}`);
        }
        return EscrowConstraintModel.fromAccountInfo(accountInfo, 0)[0];
    }
    static gpaBuilder(programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')) {
        return beetSolana.GpaBuilder.fromStruct(programId, exports.escrowConstraintModelBeet);
    }
    static deserialize(buf, offset = 0) {
        return exports.escrowConstraintModelBeet.deserialize(buf, offset);
    }
    serialize() {
        return exports.escrowConstraintModelBeet.serialize(this);
    }
    static byteSize(args) {
        const instance = EscrowConstraintModel.fromArgs(args);
        return exports.escrowConstraintModelBeet.toFixedFromValue(instance).byteSize;
    }
    static async getMinimumBalanceForRentExemption(args, connection, commitment) {
        return connection.getMinimumBalanceForRentExemption(EscrowConstraintModel.byteSize(args), commitment);
    }
    pretty() {
        return {
            key: 'Key.' + Key_1.Key[this.key],
            name: this.name,
            constraints: this.constraints,
            creator: this.creator.toBase58(),
            updateAuthority: this.updateAuthority.toBase58(),
            count: (() => {
                const x = this.count;
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
        };
    }
}
exports.EscrowConstraintModel = EscrowConstraintModel;
exports.escrowConstraintModelBeet = new beet.FixableBeetStruct([
    ['key', Key_1.keyBeet],
    ['name', beet.utf8String],
    ['constraints', beet.array(EscrowConstraint_1.escrowConstraintBeet)],
    ['creator', beetSolana.publicKey],
    ['updateAuthority', beetSolana.publicKey],
    ['count', beet.u64],
], EscrowConstraintModel.fromArgs, 'EscrowConstraintModel');
//# sourceMappingURL=EscrowConstraintModel.js.map