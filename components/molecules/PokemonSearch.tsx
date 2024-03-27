"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import PokemonList from "@/components/molecules/PokemonList";

export type SearchBy = "name" | "class";

export default function PokemonSearch() {
  const [search, setSearch] = useState("");
  const [type, setSearchBy] = useState<SearchBy>("name");

  return (
    <div>
      <div className="flex items-center justify-center space-x-4 mb-8 p-4 w-full">
        <Input
          type="text"
          placeholder={`Pesquisar por ${type === "name" ? "name" : "class"}:`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setSearchBy(e.target.value as SearchBy)}
          className="border-gray-300 border p-2"
        >
          <option value="name">Nome</option>
          <option value="class">Classe</option>
        </select>
      </div>
      <div className="">
        <PokemonList search={search} type={type} />
      </div>
    </div>
  );
}
