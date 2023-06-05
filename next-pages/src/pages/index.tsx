import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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

export async function getServerSideProps() {
    const pokemonReq = await fetch(
        `${process.env.POKEMON_API_URL}/pokemon-1500.json`,
        {
            cache: 'no-cache',
        }
    );
    const pokemon = await pokemonReq.json();
    return {
        props: {
            pokemon,
        },
    };
}

export default function Home({
    pokemon,
}: {
    pokemon: Record<string, string>[];
}) {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <h1>🥞 Next.js - Pages</h1>
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
