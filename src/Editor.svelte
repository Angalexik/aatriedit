<script lang="ts">
	import EvidencePreview from './EvidencePreview.svelte';
	import UploadButton from './UploadButton.svelte';
	import DownloadButton from './DownloadButton.svelte';

	// import type { Readable } from 'svelte/store';
	import type { fileData } from './types';

	export let titleMode: boolean = false;

	let strings: string[] | undefined;
	let filename: string | undefined;
	const fileType = titleMode ? 'nolb' : 'note';
	const loremIpsum = `Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt`;

	let json;

	function stringToArray(file: fileData | undefined): string[] | undefined {
		if (file !== undefined && file.text !== undefined && file.bytes !== undefined) {
			const json: { id: number, text: string }[] = JSON.parse(file.text);
			return json.map((x) => x.text );
		} else {
			return undefined;
		}
	}

	function arrayToString(strings: string[]): string {
		const json: { id: number, text: string }[] = strings.map((x, i) => { return { id: i, text: x }; });
		return JSON.stringify(json);
	}

	function removeExtraLines(strung: string, howMany: number): string {
		let lines = strung.split('\n');
		lines = lines.slice(0, howMany);
		return lines.join('\n');
	}

	function handleUpload() {
		strings = stringToArray($json);
	}
	
	function restrictTextarea(event: Event) {
		const element = <HTMLTextAreaElement>event.target;
		const classes = element.className.split(' '); 
		const type = classes[0];
		const index = +classes[1];
		const howMany = type === 'title' ? 1 : 3;
		strings[index] = removeExtraLines(strings[index], howMany);
	}
</script>

<main>
	<UploadButton
		label="Nahrát soubor „{fileType}“"
		bind:file={json}
		bind:filename={filename}
		on:upload={handleUpload}
	/>

	{#if strings !== undefined}
		<div class="downloadButton">
			<DownloadButton
				label="Stáhnout soubor „{fileType}“"
				mime="text/plain"
				filename={filename}
				data={arrayToString(strings)}
			/>
		</div>

		{#each strings as string, i}
			<div class="container">
				<div class="centredContainer textareaContainer">
					{#if titleMode}
						<textarea
							cols="40"
							rows="1"
							class="title {i}"
							bind:value={string}
							on:input={restrictTextarea}
						></textarea>
					{:else}
						<textarea
							cols="40"
							rows="3"
							class="description {i}"
							bind:value={string}
							on:input={restrictTextarea}
						></textarea>
					{/if}
				</div>
				<div class="centredContainer previewContainer">
					<EvidencePreview title={titleMode ? string : 'Placeholder'} description={titleMode ? loremIpsum : string} />
				</div>
			</div>
		{/each}
	{/if}
</main>

<style>
	.downloadButton {
		display: inline;
		float: right;
	}

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
		height: calc(2.7ex * 3);
	}

	.title {
		height: 2.1ex;
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
