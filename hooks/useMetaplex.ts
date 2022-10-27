import { Metaplex } from "@metaplex-foundation/js";
import { createContext, useContext } from "react";
import { PROGRAM_ID } from "../tm_js/src/generated";


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
