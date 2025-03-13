import { Type, TypesOfPokemon } from "../types/common";
export async function getTypes(): Promise<Type[]> {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
}

export async function getList(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
}

export async function getTypeList(url: string): Promise<TypesOfPokemon[]> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.pokemon;
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
}

export async function getMultipleTypeList(urls: string[]) {
  const paths = [];
  for (const url of urls) {
    paths.push(fetch(`https://pokeapi.co/api/v2/type/${url}`));
  }
  return await Promise.all(paths);
}
