import { useState, useEffect } from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Ability = {
  ability: {
    name: string;
    url: string;
  };
};

type Type = {
  type: {
    name: string;
    url: string;
  };
};

type Pokemon = {
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

const ITEMS_PER_PAGE = 16;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const PokemonList = ({
  search,
  searchBy,
}: {
  search: string;
  searchBy: string;
}) => {
  const { data: initialData, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3000`,
    fetcher
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (initialData) {
        const pokemonPromises = initialData.results.map((pokemon: Pokemon) =>
          fetcher(pokemon.url)
        );
        const pokemonData = await Promise.all(pokemonPromises);
        setPokemonData(pokemonData);
      }
    };

    fetchPokemonData();
  }, [initialData]);

  const filteredData = pokemonData.filter((pokemon: Pokemon) => {
    return pokemon.name.includes(search.toLowerCase());
  });

  console.log(pokemonData[0]);

  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const paginationItems: JSX.Element[] = [];
    const adjacentPages = 4;

    const addPaginationItem = (pageNumber: number) => {
      paginationItems.push(
        <PaginationItem key={pageNumber}>
          <PaginationLink
            href="#"
            isActive={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    };

    const addEllipsis = () => {
      paginationItems.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    };

    for (
      let i = 1;
      i <= Math.min(currentPage + adjacentPages, pageCount);
      i++
    ) {
      addPaginationItem(i);
    }

    if (currentPage + adjacentPages + 1 < pageCount) {
      addEllipsis();
    }

    return paginationItems;
  };

  const renderPokemonCards = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pokemonToShow = filteredData.slice(startIndex, endIndex);

    return pokemonToShow.map((pokemon: Pokemon) => (
      <div
        key={pokemon.name}
        className="flex-none w-[380px] justify-between mr-4 mb-4 shadow-md"
      >
        <Card
          className={cn(
            "w-[380px] bg-pokemonlogoblue rounded-md border border-black shadow-md"
          )}
        >
          <CardHeader>
            <CardTitle className="text-center text-3xl text-pokemonlogoyellow">
              {pokemon.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" md:flex items-center space-x-4 rounded-md border border-black p-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-50 h-50 mx-auto"
                  />
                </div>
                <p className="text-sm font-medium leading-none">
                  Altura: {Number(pokemon.height) / 10} m
                </p>

                <p className="text-sm font-medium leading-none">
                  Peso: {Number(pokemon.weight) / 10} kg
                </p>
                <p className="text-sm font-medium leading-none">
                  Habilidades:
                  {pokemon.abilities.map((ability, index) => (
                    <span key={index}>
                      {ability.ability.name}
                      {index < pokemon.abilities.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm font-medium leading-none">
                  Classes:
                  {pokemon.types.map((type, index) => (
                    <span key={index}>
                      {type.type.name}
                      {index < pokemon.types.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    ));
  };

  return (
    <div className="flex flex-wrap max-w-5xl text-wrap justify-center md:justify-between">
      {!isLoading ? (
        <>
          {renderPokemonCards()}
          <Pagination className="bg-white flex-wrap text-wrap max-w-5xl">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    onPageChange(currentPage > 1 ? currentPage - 1 : 1)
                  }
                />
              </PaginationItem>
              {renderPaginationItems()}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    onPageChange(
                      currentPage < pageCount ? currentPage + 1 : pageCount
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div>
          <p>Está carregando...</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
