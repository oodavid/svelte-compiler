<script>
	export let arr = [1, 2, 3];
	$: sum = arr.reduce((a, b) => a + b, 0);
</script>

<ul>
	{#each arr as item}
		<li>Item {item}!</li>
	{/each}
</ul>
<p>The sum is {sum}</p>

<style>
	ul {
		font-weight: bold;
		font-style: italic;
	}
</style>
