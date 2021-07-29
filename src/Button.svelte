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
	{...$$restProps}
>
	{label}
</button>
