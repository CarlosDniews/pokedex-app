"use client";

import { Pokemon, useGetAllPokemonsQuery } from "@/api/pokemon";
import { capitalize, range } from "lodash";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const RAW_IMAGE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const PokemonItem = ({ name, url }: Pick<Pokemon, "name" | "url">) => {
  const splitUrl = url.split("/");
  const index = splitUrl[splitUrl.length - 2];
  const pokemonImageUrl = `${RAW_IMAGE_URL}/${index}.png`;

  return (
    <a href={`/${name}`} key={name}>
      <li className="p-5 font-semibold flex items-center justify-between hover:bg-stone-50 transition-all">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-16 flex items-center justify-center bg-stone-100 rounded-xl">
            <Image
              alt={`Image of a ${name}`}
              src={pokemonImageUrl}
              className="w-12 h-12"
              height={48}
              width={48}
            />
          </div>
          <div>{capitalize(name)}</div>
        </div>
        <ChevronRight className="text-stone-500 w-4 h-4" />
      </li>
    </a>
  );
};

const PokemonList = ({ search, type }: { search: string; type: string }) => {
  const { data, isLoading } = useGetAllPokemonsQuery(type);

  const filteredData = data?.filter((pokemon: Pokemon) => {
    return pokemon.name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      {!isLoading ? (
        <ol className="flex flex-col divide divide-y divide-stone-200">
          {filteredData?.map((pokemon: Pokemon) => (
            <PokemonItem
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </ol>
      ) : (
        <div>
          <p>Está carregando...</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
