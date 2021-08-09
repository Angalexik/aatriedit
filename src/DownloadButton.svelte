<script lang="ts">
	import Button from './Button.svelte';

	import { fetchDecodeEncode } from './decode';

	export let label: string;
	export let data: string;
	export let mime: string;
	export let filename: string;
	export let format: 'lines' | 'text' | 'mdt';

	let anchor: HTMLAnchorElement;

	async function download() {
		const base64 = await fetchDecodeEncode(false, data, format);
		const datastr = `data:${mime};charset=utf8;base64,${encodeURIComponent(base64)}`;
		anchor.setAttribute('href', datastr);
		anchor.setAttribute('download', filename);
		anchor.click();
	}
</script>

<!-- svelte-ignore a11y-missing-content -->
<!-- svelte-ignore a11y-missing-attribute -->
<a bind:this={anchor} style="display: none;" aria-hidden="true"></a>

<Button label={label} backgroundColour="#1971cf" hoverBackgroundColour="#13359c" on:click={download}/>
