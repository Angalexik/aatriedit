<script lang="ts">
	import { names } from './nameStore';
</script>

<main class="centredContainer">
	<table>
		<thead>
			<tr>
				<th>Původní</th>
				<th>Adaptace</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries($names) as [i, array]}
				{#if +i !== 0}
					<tr>
						<td>{array[0]}</td>
						<td>
							<textarea bind:value={$names[i][1]} rows="1" cols="20"></textarea>
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
</main>

<style>
	table {
		font-size: 20px;
		border-spacing: 0;
		table-layout: fixed;
	}

	th {
		border-bottom: solid 2px #dee2e6;
	}

	td,
	th {
		/* width: 19.1em; */
		width: 50%;
		padding: 10px;
		text-align: left;
	}

	tr:nth-child(even) {
		background-color: #e9ecef;
	}
</style>
