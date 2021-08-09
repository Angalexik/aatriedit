<script lang="ts">
	import Button from './Button.svelte';

	import { derived, writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	import { fetchDecodeEncode } from './decode';

	import type { Readable, Writable } from 'svelte/store';
	import type { fileData } from './types';

	export let label: string;
	export let uploaded = false;
	export let filename: string | undefined = undefined;
	export let format: 'lines' | 'text' | 'mdt';

	const fileList: Writable<FileList> = writable(undefined);
	let actualUpload: HTMLInputElement;
	const dispatch = createEventDispatcher();

	export const file: Readable<fileData> = derived(
		fileList,
		($fileList, set) => {
			uploadFile($fileList).then((val) => {
				set(val);
				if (val.text !== undefined && val.bytes !== undefined) {
					uploaded = true;
					dispatch('upload', {
						label: label,
					});
				}
			});

			return () => {
				set = () => {};
			};
		},
		{ text: undefined, bytes: undefined }
	);

	// $: file = uploadFile()

	async function uploadFile(filelist: FileList): Promise<{
		text: string | undefined,
		bytes: Uint8Array | undefined
	}> {
		const file = filelist?.[0];
		const bigboi = { text: undefined, bytes: undefined };
		if (file !== undefined) {
			// const base64 = btoa(String.fromCharCode(...new Uint8Array(await file.arrayBuffer())));
			// const base64 = btoa([].reduce.call(new Uint8Array(await file.arrayBuffer()), (p: string, c: number) => { return p + String.fromCharCode(c); }, ''));
			const base64 = btoa(new Uint8Array(await file.arrayBuffer()).reduce((p: string, c: number) => p + String.fromCharCode(c), ''));
			const json = fetchDecodeEncode(true, base64, format);
			bigboi.text = json;
			bigboi.bytes = Uint8Array.from(json, (s: string) => s.charCodeAt(0));
			// bigboi.bytes = new Uint8Array(await file.arrayBuffer());
			// bigboi.text = await file.text();
			filename = file.name;
		}
		return bigboi;
	}
</script>

<input type="file" hidden bind:files={$fileList} bind:this={actualUpload}>
<Button
	label={label}
	backgroundColour="#26aa5a"
	hoverBackgroundColour="#1f8c4b"
	on:click={() => { actualUpload.click(); }}
/>
<!-- <button class="uploadButton" class:uploaded="{uploaded === true}" on:click={() => actualUpload.click()}>{label}</button> -->
