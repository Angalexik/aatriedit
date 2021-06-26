<script lang="ts">
	import Tabs from './Tabs.svelte';
	import Editor from './Editor.svelte';

	const tabItems = [
		{ label: 'Popisky profilů/důkazů', value: 0 },
		{ label: 'Názvy profilů/důkazů', value: 1 },
		{ label: 'Scénáře', value: 2 },
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
	<Editor titleMode/>
</div>

<!-- Tab 3 -->
<div class:hidden="{currentTab !== 2}">
	<h3>Tab 3 Content</h3>
</div>

<style>
	.hidden {
		display: none;
	}
</style>
