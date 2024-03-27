// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
};

export type Type = {
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  abilities: Ability[];
  types: Type[];
  weight: string;
  height: string;
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
};

export type ListItem = {
  name: string;
  url: string;
};

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getAllTypes: builder.query<ListItem[], void>({
      query: () => `https://pokeapi.co/api/v2/type`,
      transformResponse: (response: { results: ListItem[] }) =>
        response.results,
    }),

    getAllPokemons: builder.query<Pokemon[], string | undefined>({
      query: (type = "") => {
        if (type) {
          return `https://pokeapi.co/api/v2/type/${type}?offset=0&limit=3000`;
        }

        return {
          url: `https://pokeapi.co/api/v2/pokemon?offset=0&limit=3000`,
        };
      },
      transformResponse: (
        response: { results: Pokemon[]; pokemon: { pokemon: Pokemon }[] },
        metadata,
        arg
      ) => {
        return arg
          ? response.pokemon.flatMap((p) => p.pokemon)
          : response.results;
      },
    }),

    getPokemon: builder.query<Pokemon, string>({
      query: (name) => `https://pokeapi.co/api/v2/pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllPokemonsQuery,
  useGetPokemonQuery,
  useGetAllTypesQuery,
} = pokemonApi;
