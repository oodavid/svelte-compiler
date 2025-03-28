<script lang="ts">
	import { compile } from 'svelte/compiler';
	import rawSource from './Source.svelte?raw';
	import Source from './Source.svelte';

	let source = rawSource;
	let divElement: HTMLDivElement;

	let myComponent: any;

	const compileSource = async () => {
		const { js, css } = compile(source, {
			accessors: true
		});
		console.log(js.code, css.code);
		const componentSrc = URL.createObjectURL(new Blob([js.code], { type: 'text/javascript' }));
		const { default: Component } = await import(/* @vite-ignore */ componentSrc);
		URL.revokeObjectURL(componentSrc);
		divElement.innerHTML = '';
		myComponent = new Component({
			target: divElement,
			props: { arr: [4, 5, 6, 7, 8] }
		});
		console.log(myComponent);
	};

	const updateProps = () => {
		if (myComponent) {
			myComponent.$set({ arr: ['a', 'b', 'c'] });
		}
	};
</script>

<svelte:head>
	<script type="importmap">
		{
			"imports": {
				"svelte/internal": "https://unpkg.com/svelte@4.2.18/src/runtime/internal/index.js",
				"svelte/internal/disclose-version": "https://unpkg.com/svelte@4.2.18/src/runtime/internal/disclose-version/index.js"
			}
		}
	</script>
</svelte:head>

<h1>Svelte 4 - Compiler</h1>
<p>See: https://stackoverflow.com/a/73339006</p>
<textarea style="field-sizing:content" bind:value={source} />
<button on:click={compileSource}>Compile</button>
<button on:click={updateProps}>Change props</button>

<p>Compiled</p>
<div bind:this={divElement} />

<hr />

<p>Expected</p>
<Source />
