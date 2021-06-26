<script lang="ts">
	import * as _ from 'lodash';
	export let title: string;
	export let description: string;
</script>

<div class="previewContainer">
	<p class="title"><span>{title}</span></p>
	<p class="description">{description}</p>
	<div class="underlineContainer">
		{#each _.range(3) as _i}
			<div class="underline"></div>
		{/each}
	</div>
</div>

<style lang="scss">
	$offset: 0.45em;
	$description-offset: 1.2em;

	.previewContainer {
		$padding-right: 0.9em;
		$padding-left: 0.78em;
		$padding-top: 1.21em;
		border: 2px solid lightblue;
		font-family: 'AATri', serif;
		font-size: 20px;
		padding-right: 0.9em;
		padding-left: 0.78em;
		padding-top: 1.21em;
		width: calc(27.6em - (#{$padding-right} + #{$padding-left}));
		height: calc(9.4em - #{$padding-top});
	}

	.description {
		white-space: pre;
		margin-top: $description-offset;
		padding-left: $offset;
		line-height: 1.7;
		height: 5.1em;
	}

	.title {
		background-color: gold;
		padding-left: $offset;
	}

	.title span {
		position: relative;
		top: 0.1em;
	}

	.underlineContainer {
		position: relative;
		bottom: 5.2em;
		/* bottom: calc(3.8em #{$description-offset}); */
	}

	.underline {
		border-bottom: dashed 1px #444;
		margin-top: 1.7em;
	}

	p {
		margin: 0;
	}
</style>
