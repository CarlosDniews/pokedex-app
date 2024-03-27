import PokemonSearch from "@/components/molecules/PokemonSearch";

export default function Home() {
  return (
    <div className="flex md:justify-center items-center bg-pokemonlogored md:p-8 w-auto">
      <div className="bg-pokemonlogored2 md:p-8 rounded-lg shadow-lg w-auto">
        <PokemonSearch />
      </div>
    </div>
  );
}
