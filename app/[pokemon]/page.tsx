import useSWR from "swr";
import { JSX, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SelectedPokemon(pokemon: string) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    fetcher
  );

  return (
    <div>
      <Card className={cn("w-[380px] bg-pokemonlogoblue")} {...data}>
        <CardHeader>
          <CardTitle className="text-pokemonlogoyellow">{pokemon}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Nome: {pokemon}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
