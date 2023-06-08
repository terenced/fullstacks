export interface Pokemon {
    id: number;
    name: string;
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

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

export default async function Home() {
    const pokemonReq = await fetch(`http://localhost:8080/pokemon-1500.json`, {
        cache: 'no-cache',
    });
    const pokemon = (await pokemonReq.json()) as Pokemon[];

    return (
        <main className="p-5">
            <h1 className="text-3xl font-bold">🥞 Next.js - App Router</h1>
            <div className="grid grid-cols-8 mt-3" id="table">
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
