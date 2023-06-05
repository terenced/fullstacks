import type { V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

const Pokemon = ({ pokemon }: { pokemon: Record<string, string> }) => {
  return (
    <>
      {Object.keys(pokemon).map((k) => (
        <div key={[pokemon.id, k].join(",")}>{pokemon[k].toString()}</div>
      ))}
    </>
  );
};

export const meta: V2_MetaFunction = () => [
  { title: "🥞 Remix - Pokemon API" },
];

export const loader = async () => {
  const pokemonReq = await fetch(`http://localhost:8080/pokemon-1500.json`, {
    cache: "no-cache",
  });
  const pokemon = (await pokemonReq.json()) as Record<string, string>[];
  return json({ pokemon });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const pokemon = data.pokemon;
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <h1>🥞 Remix</h1>
      <div className="flex flex-col">
        {pokemon.map((p: any) => (
          <div key={p.id} className="flex flex-row gap-2">
            <Pokemon pokemon={p} />
          </div>
        ))}
      </div>
    </main>
  );
}
