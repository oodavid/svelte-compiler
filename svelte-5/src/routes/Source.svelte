<script>
  let { arr = [1, 2, 3] } = $props();
  const sum = $derived(arr.reduce((acc, val) => acc + val, 0));
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
