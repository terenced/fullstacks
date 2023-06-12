import { getAllPokemon, Pokemon } from '@/lib/db';

function PokemonRow({ pokemon }: { pokemon: Pokemon }) {
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
    const pokemon = await getAllPokemon();

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
