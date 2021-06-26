<script lang="ts">
	import EvidencePreview from './EvidencePreview.svelte';
	import UploadButton from './UploadButton.svelte';

	// import type { Readable } from 'svelte/store';
	import type { fileData } from './types';

	let descriptions: string[] | undefined;
	let titles: string[] | undefined;

	let noteJson;
	let nolbJson;

	function stringToArray(file: fileData | undefined): string[] | undefined {
		if (file !== undefined && file.text !== undefined && file.bytes !== undefined) {
			const json: { id: number, text: string }[] = JSON.parse(file.text);
			return json.map((x) => x.text );
		} else {
			return undefined;
		}
	}

	function removeExtraLines(strung: string, howMany: number): string {
		let lines = strung.split('\n');
		lines = lines.slice(0, howMany);
		return lines.join('\n');
	}

	function handleUpload() {
		descriptions = stringToArray($noteJson);
		titles = stringToArray($nolbJson);
	}
	
	function restrictTextarea(event: Event) {
		const element = <HTMLTextAreaElement>event.target;
		const classes = element.className.split(' '); 
		const type = classes[0];
		const index = +classes[1];
		if (type == 'title') {
			titles[index] = removeExtraLines(titles[index], 1);
		} else if (type == 'description') {
			descriptions[index] = removeExtraLines(descriptions[index], 3);
		}
	}
</script>

<main>
	<UploadButton label="Nahrát soubor „.note“" bind:file={noteJson} on:upload={handleUpload} />
	<UploadButton label="Nahrát soubor „.nolb“" bind:file={nolbJson} on:upload={handleUpload} />

	{#if descriptions !== undefined && titles !== undefined}
		{#each titles as title, i}
			<div class="container">
				<div class="centredContainer textareaContainer">
					<textarea cols="40" rows="1" class="title {i}" bind:value={titles[i]} on:input={restrictTextarea}></textarea>
					<textarea cols="40" rows="3" class="description {i}" bind:value={descriptions[i]} on:input={restrictTextarea}></textarea>
				</div>
				<div class="centredContainer previewContainer">
					<EvidencePreview title={title} description={descriptions[i]} />
				</div>
			</div>
		{/each}
	{/if}
</main>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		margin: 12px 0 12px 0;
		grid-gap: 10vw;
	}

	.centredContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.previewContainer {
		align-items: flex-start;
	}

	.textareaContainer {
		align-items: flex-end;
	}

	.description {
		margin-top: 35px;
		line-height: 1.45;
		height: calc(2.8ex * 3);
	}

	.title {
		height: 2.2ex;
	}

	textarea {
		resize: none;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 20px;
		border: 2px solid #dee2e6;
		overflow: hidden;
	}

	textarea:focus {
		border-color: lightblue;
	}
</style>
