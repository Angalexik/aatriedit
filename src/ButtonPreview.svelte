<script lang="ts">
	export let text: string;
</script>

<div class="optionContainer centredContainer">
	<p class="optionText">{text}</p>
</div>

<style>
	.optionContainer {
		font-size: 24px;
		font-family: 'AATri', serif;
		width: 20em;
		margin: 10px 0;
	}

	.optionText {
		color: white;
		margin: 0.2em 0;
	}
</style>
