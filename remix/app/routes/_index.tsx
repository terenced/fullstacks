import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [
  { title: "🥞 Remix - Pokemon API" },
];

export interface Pokemon {
  id: number;
  name: string;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export const loader = async () => {
  const pokemonReq = await fetch(
    `${process.env.POKEMON_DATA_URL}/pokemon-1500.json`,
    {
      cache: "no-cache",
    }
  );
  const pokemon = (await pokemonReq.json()) as Pokemon[];
  return json({ pokemon });
};

export function PokemonRow({ pokemon }: { pokemon: Pokemon }) {
  return (
    <>
      <div>{pokemon.id}</div>
      <div className="font-bold">{pokemon.name}</div>
      <div>{pokemon.hp}</div>
      <div>{pokemon.attack}</div>
      <div>{pokemon.defense}</div>
      <div>{pokemon.special_attack}</div>
      <div>{pokemon.special_defense}</div>
      <div>{pokemon.speed}</div>
    </>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const pokemon = data.pokemon;
  return (
    <main className="p-5">
      <h1 className="text-3xl font-bold">🥞 Remix </h1>
      <div className="mt-3 grid grid-cols-8" id="table">
        <div className="font-bold">ID</div>

        <div className="font-bold">Name</div>
        <div className="font-bold">HP</div>
        <div className="font-bold">Attack</div>
        <div className="font-bold">Defense</div>
        <div className="font-bold">Sp. Attack</div>
        <div className="font-bold">Sp. Defense</div>
        <div className="font-bold">Speed</div>
        {pokemon.map((p) => (
          <PokemonRow key={p.id} pokemon={p} />
        ))}
      </div>
    </main>
  );
}
