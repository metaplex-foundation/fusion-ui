"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const spok_1 = __importDefault(require("spok"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const mpl_token_metadata_1 = require("../src/mpl-token-metadata");
const fixtures = path_1.default.join(__dirname, 'fixtures');
(0, tape_1.default)('deserialize: faulty token metadata', async (t) => {
    const filename = 'faulty_13gxS4r6SiJn8fwizKZT2W8x8DL6vjN1nAhPWsfNXegb.buf';
    const data = await fs_1.promises.readFile(path_1.default.join(fixtures, filename));
    const [metadata] = mpl_token_metadata_1.Metadata.deserialize(data);
    (0, spok_1.default)(t, metadata, {
        key: mpl_token_metadata_1.Key.MetadataV1,
        data: {
            symbol: spok_1.default.startsWith('BORYOKU'),
            name: spok_1.default.startsWith('Boryoku Dragonz #515'),
            sellerFeeBasisPoints: 500,
        },
        primarySaleHappened: true,
        isMutable: true,
        editionNonce: 255,
        tokenStandard: null,
        collection: null,
        uses: null,
    });
    {
        t.comment('+++ adding tokenStandard and corrupting following data');
        const metadataWithTokenStandard = mpl_token_metadata_1.Metadata.fromArgs({
            ...metadata,
            tokenStandard: mpl_token_metadata_1.TokenStandard.NonFungibleEdition,
        });
        const [serialized] = mpl_token_metadata_1.metadataBeet.serialize(metadataWithTokenStandard);
        const buf = Buffer.concat([serialized, Buffer.from('some bogus data here')]);
        const [deserialized] = mpl_token_metadata_1.Metadata.deserialize(buf);
        (0, spok_1.default)(t, deserialized, {
            key: mpl_token_metadata_1.Key.MetadataV1,
            data: {
                symbol: spok_1.default.startsWith('BORYOKU'),
                name: spok_1.default.startsWith('Boryoku Dragonz #515'),
                sellerFeeBasisPoints: 500,
            },
            primarySaleHappened: true,
            isMutable: true,
            editionNonce: 255,
            tokenStandard: mpl_token_metadata_1.TokenStandard.NonFungibleEdition,
            collection: null,
            uses: null,
        });
    }
    {
        t.comment('+++ adding collection and corrupting following data');
        const metadataWithTokenStandardAndCollection = mpl_token_metadata_1.Metadata.fromArgs({
            ...metadata,
            tokenStandard: mpl_token_metadata_1.TokenStandard.NonFungibleEdition,
            collection: { verified: true, key: metadata.updateAuthority },
        });
        const [serialized] = mpl_token_metadata_1.metadataBeet.serialize(metadataWithTokenStandardAndCollection);
        const buf = Buffer.concat([serialized, Buffer.from('some bogus data here')]);
        const [deserialized] = mpl_token_metadata_1.Metadata.deserialize(buf);
        (0, spok_1.default)(t, deserialized, {
            key: mpl_token_metadata_1.Key.MetadataV1,
            data: {
                symbol: spok_1.default.startsWith('BORYOKU'),
                name: spok_1.default.startsWith('Boryoku Dragonz #515'),
                sellerFeeBasisPoints: 500,
            },
            primarySaleHappened: true,
            isMutable: true,
            editionNonce: 255,
            tokenStandard: mpl_token_metadata_1.TokenStandard.NonFungibleEdition,
            collection: {
                verified: true,
                key: ((k) => k.equals(metadata.updateAuthority)),
            },
            uses: null,
        });
    }
});
(0, tape_1.default)('deserialize: fixed token metadata', async (t) => {
    const filename = 'faulty_13gxS4r6SiJn8fwizKZT2W8x8DL6vjN1nAhPWsfNXegb.buf';
    const data = await fs_1.promises.readFile(path_1.default.join(fixtures, filename));
    const [metadata] = mpl_token_metadata_1.Metadata.deserialize(data);
    const metadataFixed = mpl_token_metadata_1.Metadata.fromArgs({
        ...metadata,
        tokenStandard: mpl_token_metadata_1.TokenStandard.NonFungibleEdition,
        collection: { verified: true, key: metadata.updateAuthority },
        uses: {
            useMethod: mpl_token_metadata_1.UseMethod.Multiple,
            remaining: 2,
            total: 1,
        },
    });
    const [buf] = mpl_token_metadata_1.metadataBeet.serialize(metadataFixed);
    const [deserialized] = mpl_token_metadata_1.Metadata.deserialize(buf);
    (0, spok_1.default)(t, deserialized, {
        key: mpl_token_metadata_1.Key.MetadataV1,
        data: {
            symbol: spok_1.default.startsWith('BORYOKU'),
            name: spok_1.default.startsWith('Boryoku Dragonz #515'),
            sellerFeeBasisPoints: 500,
        },
        primarySaleHappened: true,
        isMutable: true,
        editionNonce: 255,
        tokenStandard: mpl_token_metadata_1.TokenStandard.NonFungibleEdition,
        collection: {
            verified: true,
            key: ((k) => k.equals(metadata.updateAuthority)),
        },
        uses: {
            useMethod: mpl_token_metadata_1.UseMethod.Multiple,
            remaining: (n) => n.toString() === '2',
            total: (n) => n.toString() === '1',
        },
    });
});
//# sourceMappingURL=token-metadata-deserializer.js.map