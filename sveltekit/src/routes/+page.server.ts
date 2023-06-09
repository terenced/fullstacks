import { POKEMON_DATA_URL } from '$env/static/private';
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

export const load = async () => {
	const pokemonReq = await fetch(`${POKEMON_DATA_URL}/pokemon-1500.json`, {
		cache: 'no-cache'
	});
	const pokemon = (await pokemonReq.json()) as Pokemon[];
	return { pokemon };
};
