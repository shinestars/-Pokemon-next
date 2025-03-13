import axios from "axios";
import { types, TypesOfPokemon } from "../components/types";
// 获取宝可梦类型数据的函数
export async function getTypes(): Promise<types[]> {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
}

export async function getList(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
}

export async function getTypeList(url: string): Promise<TypesOfPokemon[]> {
  try {
    const response = await axios.get(url);
    return response.data.pokemon;
  } catch (error) {
    console.error("Error fetching types:", error);
    return [];
  }
}

export async function getMultipleTypeList(urls: string[]) {
  const paths = [];
  for (const url of urls) {
    paths.push(axios.get(`https://pokeapi.co/api/v2/type/${url}`));
  }
  return await Promise.all(paths);
}
