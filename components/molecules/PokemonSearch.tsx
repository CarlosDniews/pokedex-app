"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import PokemonList from "@/components/molecules/PokemonList";

export default function PokemonSearch() {
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  return (
    <div>
      <div className="flex items-center justify-center space-x-4 mb-8 p-4 w-full">
        <Input
          type="text"
          placeholder={`Pesquisar por ${
            searchBy === "nome" ? "nome" : "classe"
          }:`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="border-gray-300 border p-2"
        >
          <option value="nome">Nome</option>
          <option value="classe">Classe</option>
        </select>
      </div>
      <div className="">
        <PokemonList search={search} searchBy={searchBy} />
      </div>
    </div>
  );
}
