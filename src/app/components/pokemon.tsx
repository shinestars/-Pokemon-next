import Image from "next/image";
import { PokemonType } from "../types/common";
export default function Pokemon({ name, url }: PokemonType) {
  const id = Number.parseInt(
    url.split("https://pokeapi.co/api/v2/pokemon/")[1]
  );
  return (
    <div className="flex flex-col items-center justify-between">
      {name}
      <Image
        className="dark:invert w-20"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`}
        alt={`${name}`}
        width={35}
        height={53}
      />
      <p>Number: {id}</p>
    </div>
  );
}
