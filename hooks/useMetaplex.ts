import { Metaplex } from "@metaplex-foundation/js";
import { createContext, useContext } from "react";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";


interface MetaplexContextInterface {
  metaplex: Metaplex | null;
}

const defaultContext = {
  metaplex: null,
};

export const MetaplexContext = createContext<MetaplexContextInterface>(
  defaultContext,
);

export function useMetaplex() {
  let ctx = useContext(MetaplexContext);
  return ctx;
}
