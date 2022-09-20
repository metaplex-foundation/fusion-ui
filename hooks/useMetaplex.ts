import { Metaplex } from "@metaplex-foundation/js";
import { createContext, useContext } from "react";

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
  return useContext(MetaplexContext);
}
