import type { V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Pokemon } from "~/db.server";
import { getAllPokemon } from "~/db.server";

export const meta: V2_MetaFunction = () => [
  { title: "🥞 Remix - Pokemon API" },
];

export const loader = async () => {
  const pokemon = await getAllPokemon();
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
      <div>{pokemon.specialAttack}</div>
      <div>{pokemon.specialDefense}</div>
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
