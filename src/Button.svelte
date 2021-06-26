<script lang="ts">
	export let label: string;
	export let backgroundColour = '#0f0';
	export let hoverBackgroundColour = '#0d0';
	export let colour = '#fff';

	let button: HTMLButtonElement;
	let currentBackgroundColour = backgroundColour;

	$: if (button !== undefined) {
		button.style.color = colour;
	}
	$: if (button !== undefined) {
		button.style.backgroundColor = currentBackgroundColour;
	}
</script>

<button
	bind:this={button}
	on:mouseenter={() => { currentBackgroundColour = hoverBackgroundColour; }}
	on:mouseleave={() => { currentBackgroundColour = backgroundColour; }}
	on:click
>
	{label}
</button>

<style>
	button {
		cursor: pointer;
		
		font-family: inherit;
		font-size: 20px;
		
		border: none;
		color: white;
		
		border-radius: 0.25rem;
		
		padding: 0.5rem 1rem;
		
		transition: background-color 0.15s ease-in-out;
	}
</style>
