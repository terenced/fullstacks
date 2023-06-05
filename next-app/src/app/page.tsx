const Pokemon = ({ pokemon }: { pokemon: Record<string, string> }) => {
    return (
        <>
            {Object.keys(pokemon).map((k) => (
                <div key={[pokemon.id, k].join(',')}>
                    {pokemon[k].toString()}
                </div>
            ))}
        </>
    );
};

export default async function Home() {
    const pokemonReq = await fetch(
        `${process.env.POKEMON_API_URL}/pokemon-1500.json`,
        {
            cache: 'no-cache',
        }
    );
    const pokemon = (await pokemonReq.json()) as Record<string, string>[];

    return (
        <main>
            <h1>🥞 Next.js - App Router</h1>
            {pokemon.map((p) => (
                <div key={p.id} className="flex flex-row gap-2">
                    <Pokemon pokemon={p} />
                </div>
            ))}
        </main>
    );
}
