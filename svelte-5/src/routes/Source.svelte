<script>
	let { arr = [1, 2, 3] } = $props();
	const sum = $derived(arr.reduce((acc, val) => acc + val, 0));
	const foo = () => {
		alert('foo');
	};
</script>

<ul>
	{#each arr as item}
		<li>Item {item}!</li>
	{/each}
</ul>
<p>The sum is {sum}</p>
<button type="button" onclick={foo}> Say foo </button>

<style>
	ul {
		font-weight: bold;
		font-style: italic;
	}
</style>
