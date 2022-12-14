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
exports.keyBeet = exports.Key = void 0;
const beet = __importStar(require("@metaplex-foundation/beet"));
var Key;
(function (Key) {
    Key[Key["Uninitialized"] = 0] = "Uninitialized";
    Key[Key["EditionV1"] = 1] = "EditionV1";
    Key[Key["MasterEditionV1"] = 2] = "MasterEditionV1";
    Key[Key["ReservationListV1"] = 3] = "ReservationListV1";
    Key[Key["MetadataV1"] = 4] = "MetadataV1";
    Key[Key["ReservationListV2"] = 5] = "ReservationListV2";
    Key[Key["MasterEditionV2"] = 6] = "MasterEditionV2";
    Key[Key["EditionMarker"] = 7] = "EditionMarker";
    Key[Key["UseAuthorityRecord"] = 8] = "UseAuthorityRecord";
    Key[Key["CollectionAuthorityRecord"] = 9] = "CollectionAuthorityRecord";
    Key[Key["TokenOwnedEscrow"] = 10] = "TokenOwnedEscrow";
    Key[Key["EscrowConstraintModel"] = 11] = "EscrowConstraintModel";
})(Key = exports.Key || (exports.Key = {}));
exports.keyBeet = beet.fixedScalarEnum(Key);
//# sourceMappingURL=Key.js.map