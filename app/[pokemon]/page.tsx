"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetPokemonQuery } from "@/api/pokemon";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useParams } from "next/navigation";

export default function SelectedPokemon() {
  const { pokemon } = useParams();
  const { data, error } = useGetPokemonQuery(pokemon as string);

  console.log(data);

  return (
    <Provider store={store}>
      <div>
        <Card
          className={cn(
            "w-[380px] md:w-[1200px] md:h-[600px] mt-10 bg-pokemonlogoblue"
          )}
        >
          <CardHeader>
            <div className="w-100 h-100 flex items-center justify-center rounded-xl">
              <Image
                alt={`Image of a pokemon ${data?.name}`}
                src={data?.sprites.front_default ?? ""}
                className="w-100 h-100"
                height={300}
                width={300}
              />
            </div>
            <CardTitle className="text-pokemonlogoyellow text-center">
              {data?.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span>Nome: </span>
                  <span>{data?.name}</span>
                </p>
                <p className="text-sm font-medium leading-none">
                  <span>Altura: </span>
                  <span>{data?.height}</span>
                </p>
                <p className="text-sm font-medium leading-none">
                  <span>Peso: </span>
                  <span>{data?.weight}</span>
                </p>
                <p className="text-sm font-medium leading-none">
                  <span>Classes:</span>
                  {data?.types.map((type, index) => (
                    <span key={index}>
                      {type.type.name}
                      {index < data.types.length - 1 && ", "}
                    </span>
                  ))}
                </p>
                <p className="text-sm font-medium leading-none">
                  <span>Habilidades:</span>
                  {data?.abilities.map((ability, index) => (
                    <span key={index}>
                      {ability.ability.name}
                      {index < data.abilities.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </Provider>
  );
}
