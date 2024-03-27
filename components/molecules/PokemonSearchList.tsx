"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import PokemonList from "@/components/molecules/PokemonList";
import { capitalize, debounce } from "lodash";
import { useGetAllTypesQuery } from "@/api/pokemon";
import clsx from "clsx";

export default function PokemonSearchList() {
  const { data, isLoading } = useGetAllTypesQuery();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("normal");
  const debouncedSearch = debounce((e) => setSearch(e.target.value), 500);

  return (
    <div>
      <div className="p-5 w-full space-y-3">
        <Input
          type="text"
          placeholder={`Pesquisar por nome`}
          onChange={(e) => debouncedSearch(e)}
        />
        <div className="gap-1.5 flex items-center flex-wrap">
          {isLoading ? (
            <div>loading...</div>
          ) : (
            data?.map((t) => (
              <div
                key={t.name}
                className={clsx(
                  "px-2 py-0.5 rounded-lg cursor-pointer",
                  type === t.name ? "bg-green-500" : "bg-stone-100"
                )}
                onClick={() => {
                  if (type === t.name) {
                    setType("");
                    return;
                  }
                  setType(t.name);
                }}
              >
                {capitalize(t.name)}
              </div>
            ))
          )}
        </div>
      </div>
      <PokemonList search={search} type={type} />
    </div>
  );
}
