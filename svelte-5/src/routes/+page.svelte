<script lang="ts">
	import { compile } from 'svelte/compiler';
	import rawSource from './Source.svelte?raw';
	import Source from './Source.svelte';

	let source = $state(rawSource);
	let divElement: HTMLDivElement;

	let myComponent: any;

	const compileSource = async () => {
		const { js, css } = compile(source, {
			// ...
		});
		console.log(js.code, css?.code);
		const componentSrc = URL.createObjectURL(new Blob([js.code], { type: 'text/javascript' }));
		// The error happens here
		const { default: Component } = await import(/* @vite-ignore */ componentSrc);
		// ...I've not managed to test anything beyond this point
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
				"svelte/internal/client": "https://unpkg.com/svelte@5.25.3/src/internal/client/index.js",
				"svelte/internal/disclose-version": "https://unpkg.com/svelte@5.25.3/src/internal/disclose-version.js",
				"svelte/internal/flags/legacy": "https://unpkg.com/svelte@5.25.3/src/internal/flags/legacy.js"
			}
		}
	</script>
</svelte:head>

<h1>Svelte 5 - Compiler</h1>
<p>See: https://stackoverflow.com/a/73339006</p>
<textarea style="field-sizing:content" bind:value={source}></textarea>
<button onclick={compileSource}>Compile</button>
<button onclick={updateProps}>Change props</button>

<p>Compiled</p>
<div bind:this={divElement}></div>

<hr />

<p>Expected</p>
<Source />
