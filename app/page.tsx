"use client";

import PokemonSearch from "@/components/molecules/PokemonSearchList";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <PokemonSearch />
    </Provider>
  );
}
