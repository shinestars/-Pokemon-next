"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Types from "./components/types";
import Pokemon from "./components/pokemon";
import Pagination from "./components/pagination";
import {
  getTypes,
  getList,
  getTypeList,
  getMultipleTypeList,
} from "./services/getData";
import { PokemonType, types, TypesOfPokemon } from "./types/common";
interface Result {
  previous: null | string;
  next: null | string;
  count: number;
}

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [types, setTypes] = useState<types[]>([]);
  const [selectTypes, setSelectedTypes] = useState<string[]>([]);
  const [list, setList] = useState<PokemonType[]>([]);
  const [result, setResult] = useState<Result>({
    previous: null,
    next: null,
    count: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTypes().then((res) => {
      setTypes(res);
    });
  }, []);

  const getResult = useCallback((type: string[], page: number) => {
    setLoading(true);
    const len = type.length;
    if (len === 0) {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${
        (page - 1) * 24
      }&limit=24`;
      getList(url).then((res) => {
        const { results, ...rest } = res;
        setList(results);
        setResult({ ...rest });
        setLoading(false);
      });
    } else if (len === 1) {
      getTypeList(`https://pokeapi.co/api/v2/type/${type[0]}`).then(
        (result) => {
          const res = result.map((i: TypesOfPokemon) => i.pokemon);
          updateResultAndList(res, page);
          setLoading(false);
        }
      );
    } else {
      getMultipleTypeList(type).then((result) => {
        setLoading(false);
        let res: PokemonType[] = [];
        for (let i = 0; i < result.length; i++) {
          const pokemons = result[i].data.pokemon.map(
            (i: TypesOfPokemon) => i.pokemon
          );
          res = res.concat(pokemons);
        }
        const map = new Map();
        for (const p of res) {
          map.set(p.url, (map.get(p.url) ?? 0) + 1);
        }
        const list: PokemonType[] = [];
        map.forEach((v, k) => {
          if (v >= 2) {
            list.push(res.find((i) => i.url === k)!);
          }
        });
        updateResultAndList(list, page);
      });
    }
  }, []);

  useEffect(() => {
    const selectTypes = (searchParams.get("type") ?? "")
      .split(",")
      .filter((t) => !!t);
    const page = Number(searchParams.get("page") ?? 1);
    setSelectedTypes(selectTypes);
    getResult(selectTypes, page);
  }, [searchParams, getResult]);

  const updateResultAndList = (list: PokemonType[], page: number) => {
    const count = list.length;
    const start = (page - 1) * 24;
    const end = page * 24;
    if (start > count) {
      return;
    }
    setList(list.slice(start, end));
    setResult({
      previous: start > 0 ? "0" : null,
      next: count > end ? "0" : null,
      count,
    });
  };

  const updateTypes = (t: types) => {
    let copieTypes = [...selectTypes];
    if (copieTypes.find((tp) => tp === t.name)) {
      copieTypes = copieTypes.filter((tp) => tp !== t.name);
    } else {
      copieTypes.push(t.name);
    }
    updateSearchParams(copieTypes, 1);
  };

  const updatePage = (step: number) => {
    updateSearchParams(
      selectTypes,
      Number(searchParams.get("page") ?? 1) + step
    );
  };

  const updateSearchParams = (type: string[], page: number) => {
    const searchParams = new URLSearchParams();
    searchParams.append("page", page.toString());
    if (type.length > 0) {
      searchParams.append("type", Array.from(type).join(","));
    }
    router.push(`?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 px-10">
      <h1>欢迎来到宝可梦世界</h1>
      Total count: {result?.count}
      <Types
        types={types}
        updateTypes={updateTypes}
        selectTypes={selectTypes}
      />
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="flex flex-col justify-center">
          <section className="grid grid-cols-6 gap-16">
            {list.map((i) => (
              <Pokemon key={i.name} {...i} />
            ))}
          </section>
          <Pagination
            updatePage={updatePage}
            previous={result.previous}
            next={result.next}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
