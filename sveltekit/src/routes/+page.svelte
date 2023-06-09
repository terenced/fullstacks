<script lang="ts">
	export let data;
</script>

<main class="p-8">
	<h1 class="text-3xl font-bold">🥞 SvelteKit</h1>
	<div class="mt-3 grid grid-cols-8" id="table">
		<div class="font-bold">ID</div>
		<div class="font-bold">Name</div>
		<div class="font-bold">HP</div>
		<div class="font-bold">Attack</div>
		<div class="font-bold">Defense</div>
		<div class="font-bold">Sp. Attack</div>
		<div class="font-bold">Sp. Defense</div>
		<div class="font-bold">Speed</div>
		{#each data.pokemon as pokemon}
			<div>{pokemon.id}</div>
			<div class="font-bold">{pokemon.name}</div>
			<div>{pokemon.hp}</div>
			<div>{pokemon.attack}</div>
			<div>{pokemon.defense}</div>
			<div>{pokemon.special_attack}</div>
			<div>{pokemon.special_defense}</div>
			<div>{pokemon.speed}</div>
		{/each}
	</div>
</main>
