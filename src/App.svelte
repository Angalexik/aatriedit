<script lang="ts">
	import Tabs from './Tabs.svelte';
	import Editor from './Editor.svelte';
	import MdtEditor from './MdtEditor.svelte';
	import NameEdit from './NameEdit.svelte';

	const tabItems = [
		{ label: 'Popisky profilů/důkazů', value: 0 },
		{ label: 'Názvy profilů/důkazů', value: 1 },
		{ label: 'Tlačítka, možnosti', value: 2 },
		{ label: 'Scénáře', value: 3 },
		{ label: 'Jména', value: 4 },
	];

	let currentTab = 0;
</script>

<Tabs bind:activeTabValue={currentTab} items={tabItems} />

<!-- Tab 1 -->
<div class:hidden="{currentTab !== 0}">
	<Editor />
</div>

<!-- Tab 2 -->
<div class:hidden="{currentTab !== 1}">
	<Editor titleMode />
</div>

<!-- Tab 3 -->
<div class:hidden="{currentTab !== 2}">
	<Editor buttonMode />
</div>

<!-- Tab 4 -->
<div class:hidden="{currentTab !== 3}">
	<!-- <MdtPreview name="Edgeworth" text={'Then allow me to remove\nthat doubt from your mind\nYour Honour...'}/> -->
	<MdtEditor />
</div>

<!-- Tab 5 -->
<div class:hidden="{currentTab !== 4}">
	<NameEdit />
</div>

<style>
	.hidden {
		display: none;
	}
</style>
