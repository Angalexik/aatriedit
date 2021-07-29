<script lang="ts">
	import UploadButton from './UploadButton.svelte';
	import MdtPreview from './MdtPreview.svelte';
	import DownloadButton from './DownloadButton.svelte';

	import { set } from 'lodash';
	import { isGSOperation, isGSString } from './types';

	import type { fileData, GSSomething } from './types';
	import type { Readable } from 'svelte/store';

	let file: Readable<fileData>;
	let filename: string | undefined;
	let boxes: { ids: number[], preview: string, speaker: number }[] = [];
	let json: GSSomething[] | undefined;
	let uploaded: boolean;


	function stringToJson(file: fileData): GSSomething[] | undefined {
		if (file !== undefined && file.text !== undefined && file.bytes !== undefined) {
			const json = JSON.parse(file.text);
			console.log(json);
			return json;
		}
		return undefined;
	}

	function updatePreview() {
		let index = 0;
		let text = '';
		json.forEach((operation) => {
			if (boxes[index] === undefined) {
				set(boxes, [index, 'preview'], '');
			}

			if (isGSString(operation) && operation.Content !== 'ᾀ') {
				text += operation.Content;
			} else if (isGSOperation(operation)) {
				switch (operation.Opcode) {
				case 0x01: // Newline
					text += '\n';
					break;
				case 0x02: // ReadKey
				case 0x0A: // ReadKey
				case 0x0D: // Exit
				case 0x16: // NextScenario
				case 0x2D: // ReadKey
				case 0x2E: // ClearText
					boxes[index].preview = text.replace(/^\n+|\n+$/, '');
					text = '';
					++index;
					break;
				default:
					break;
				}
			}
		});
	}

	function updateBoxes() {
		let index = 0;
		let text = '';
		let speaker = 0;
		if (boxes[0] !== undefined) {
			boxes.forEach((box) => {
				box.ids = [];
				box.preview = '';
				box.speaker = 0;
			});
		}
		json.forEach((operation, idx) => {
			if (boxes[index] === undefined) {
				set(boxes, [index, 'ids'], []);
				set(boxes, [index, 'preview'], '');
				set(boxes, [index, 'speaker'], 0);
			}

			if (isGSString(operation) && operation.Content !== 'ᾀ') {
				text += operation.Content;
				// boxes[index].ids.push(idx);
				boxes[index].ids = [...boxes[index].ids, idx];
			} else if (isGSOperation(operation)) {
				switch (operation.Opcode) {
				case 0x01: // Newline
					text += '\n';
					break;
				case 0x02: // ReadKey
				case 0x0A: // ReadKey
				case 0x0D: // Exit
				case 0x16: // NextScenario
				case 0x2D: // ReadKey
				case 0x2E: // ClearText
					boxes[index].preview = text.replace(/^\n+|\n+$/, '');
					boxes[index].speaker = speaker;
					text = '';
					++index;
					break;
				case 0x0E: // SetSpeakerId
					speaker = operation.Args?.[0] ?? 0;
					break;
				default:
					break;
				}
			}
		});
	}

	function handleUpload() {
		json = stringToJson($file);
		updateBoxes();
	}

	function addLine(event: MouseEvent) {
		const id: number = +(<HTMLButtonElement>event.target).dataset.index;
		console.log(id);
		json.splice(id, 0, {
			'$type': 'GSMdtTools.GSOperationToken, GSMdtTools',
			Args: [],
			Name: 'CodeProc_01',
			Opcode: 0x01,
		});
		json.splice(id + 1, 0, {
			'$type': 'GSMdtTools.GSStringToken, GSMdtTools',
			Content: 'text',
			Custom: true,
		});
		updateBoxes();
		console.log(json);
	}

	function deleteLine(event: MouseEvent) {
		const id = +(<HTMLSpanElement>event.currentTarget).dataset.index;
		json.splice(id - 1, 1);
		json.splice(id - 1, 1);
		updateBoxes();
	}
</script>

<main>
	<UploadButton
		label="Nahrát soubor „mdt“"
		format="mdt"
		bind:file={file}
		bind:filename={filename}
		bind:uploaded={uploaded}
		on:upload={handleUpload}
	/>
	{#if uploaded}
		<div class="downloadButton">
			<DownloadButton
				label="Stáhnout soubor „{filename}“"
				mime="application/octet-stream"
				filename={filename}
				data={JSON.stringify(json)}
				format="mdt"
			/>
		</div>
		{#each boxes as box}
			<div class="container">
				<div class="centredContainer textareaContainer">
					{#each box.ids as id}
						<div style="width: 100%;"> <!-- FIXME: Inline styles are bad -->
							<textarea
								bind:value={(json[id]).Content}
								on:input={updatePreview}
								rows="1"
								cols="31"
								maxlength="32"
								class:deletable={json[id].Custom}
							></textarea>
							{#if json[id].Custom}
								<span data-index={id} on:click={deleteLine}>
									<span
										class="iconify-inline closeIcon"
										data-icon="mdi:close"
									></span>
								</span>
							{/if}
						</div>
					{/each}
					<!-- <Button
						label="Přidat nový řádek"
						colour="#1971cf"
						backgroundColour="#fff"
						hoverBackgroundColour="#fff"
						value={box.ids[box.ids.length - 1] + 1}
						on:click={addLine}
					/> -->
					<button on:click={addLine} data-index={box.ids[box.ids.length - 1] + 1}>Přidat nový řádek</button>
				</div>
				<div class="centredContainer previewContainer">
					<MdtPreview text={box.preview} name={box.speaker} />
				</div>
			</div>
		{/each}
	{/if}
</main>

<style>
	textarea,
	.closeIcon {
		margin: 5px 0;
	}

	textarea {
		width: calc(100% - 8px); /* fuck you */
	}

	.deletable {
		width: calc(100% - 8px - 32px);
	}

	.closeIcon {
		font-size: 27px;
		cursor: pointer;
	}

	button {
		color: #1971cf;
		background-color: white;
		border: 2px #1971cf solid;
		width: 100%;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
	}

	button:hover {
		color: white;
		background-color: #1971cf;
	}

	.textareaContainer {
		justify-self: flex-end;
		width: 400px;
	}
</style>
