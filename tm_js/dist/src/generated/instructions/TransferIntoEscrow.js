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
exports.createTransferIntoEscrowInstruction = exports.transferIntoEscrowInstructionDiscriminator = exports.TransferIntoEscrowStruct = void 0;
const splToken = __importStar(require("@solana/spl-token"));
const beet = __importStar(require("@metaplex-foundation/beet"));
const web3 = __importStar(require("@solana/web3.js"));
const TransferIntoEscrowArgs_1 = require("../types/TransferIntoEscrowArgs");
exports.TransferIntoEscrowStruct = new beet.BeetArgsStruct([
    ['instructionDiscriminator', beet.u8],
    ['transferIntoEscrowArgs', TransferIntoEscrowArgs_1.transferIntoEscrowArgsBeet],
], 'TransferIntoEscrowInstructionArgs');
exports.transferIntoEscrowInstructionDiscriminator = 39;
function createTransferIntoEscrowInstruction(accounts, args, programId = new web3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')) {
    var _a, _b, _c;
    const [data] = exports.TransferIntoEscrowStruct.serialize({
        instructionDiscriminator: exports.transferIntoEscrowInstructionDiscriminator,
        ...args,
    });
    const keys = [
        {
            pubkey: accounts.escrow,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.payer,
            isWritable: true,
            isSigner: true,
        },
        {
            pubkey: accounts.attributeMint,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.attributeSrc,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.attributeDst,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: accounts.attributeMetadata,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.escrowMint,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.escrowAccount,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_a = accounts.systemProgram) !== null && _a !== void 0 ? _a : web3.SystemProgram.programId,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_b = accounts.ataProgram) !== null && _b !== void 0 ? _b : splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: (_c = accounts.tokenProgram) !== null && _c !== void 0 ? _c : splToken.TOKEN_PROGRAM_ID,
            isWritable: false,
            isSigner: false,
        },
        {
            pubkey: accounts.constraintModel,
            isWritable: false,
            isSigner: false,
        },
    ];
    const ix = new web3.TransactionInstruction({
        programId,
        keys,
        data,
    });
    return ix;
}
exports.createTransferIntoEscrowInstruction = createTransferIntoEscrowInstruction;
//# sourceMappingURL=TransferIntoEscrow.js.map