<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';
	import type { fileData } from './types';

	export let label: string;
	export let uploaded = false;

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

	async function uploadFile(filelist: FileList): Promise<{ text: string | undefined, bytes: Uint8Array | undefined }> {
		const file = filelist?.[0];
		const bigboi = { text: undefined, bytes: undefined };
		if (file !== undefined) {
			bigboi.bytes = new Uint8Array(await file.arrayBuffer());
			bigboi.text = await file.text();
		}
		return bigboi;
	}
</script>

<input type="file" hidden bind:files={$fileList} bind:this={actualUpload}>
<button class="uploadButton" class:uploaded="{uploaded === true}" on:click={() => actualUpload.click()}>{label}</button>

<style>
	button {
		cursor: pointer;
		
		font-family: inherit;
		font-size: 20px;
		
		border: none;
		color: white;
		background-color: #26aa5a;
		
		border-radius: 0.25rem;
		
		padding: 0.5rem 1rem;
		
		transition: background-color 0.15s ease-in-out;
	}

	button:hover {
		background-color: #1f8c4b;
	}

	button.uploaded {
		background-color: #cf2519;
	}

	button.uploaded:hover {
		background-color: #9c1c13;
	}
</style>
