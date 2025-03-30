<script lang="ts">
	import { compile } from 'svelte/compiler';
	import rawSource from '../Source.svelte?raw';
	import Source from '../Source.svelte';

	let source = $state(rawSource);
	let divElement: HTMLDivElement;

	let myComponent: any;

	const compileSource = async () => {
		const { js, css } = compile(source, {
			runes: true,
			compatibility: {
				componentApi: 4 // Means we can do `new Component({ ... })`
			},
			customElement: true // Means the css is injected
		});
		console.log(js.code, css?.code);
		const componentSrc = URL.createObjectURL(new Blob([js.code], { type: 'text/javascript' }));
		const { default: Component } = await import(/* @vite-ignore */ componentSrc);
		URL.revokeObjectURL(componentSrc);
		divElement.innerHTML = '';
		myComponent = new Component({
			target: divElement,
			props: { arr: [4, 5, 6, 7, 8] }
		});
	};

	const updateProps = () => {
		if (myComponent) {
			myComponent.$set({ arr: ['a', 'b', 'c'] });
		}
	};
</script>

<svelte:head>
	<!--
		How did we build this list?
		Via the package.json of the svelte package:
	 	https://app.unpkg.com/svelte@5.25.3/files/package.json
	-->
	<script type="importmap">
		{
			"imports": {
				"svelte/internal/client": "https://unpkg.com/svelte@5.25.3/src/internal/client/index.js",
				"svelte/internal/disclose-version": "https://unpkg.com/svelte@5.25.3/src/internal/disclose-version.js",
				"svelte/internal/flags/legacy": "https://unpkg.com/svelte@5.25.3/src/internal/flags/legacy.js",
				"svelte/legacy": "https://unpkg.com/svelte@5.25.3/src/legacy/legacy-client.js",
				"esm-env": "https://unpkg.com/esm-env@1.2.1/index.js",
				"esm-env/browser": "https://unpkg.com/esm-env@1.2.1/true.js",
				"esm-env/development": "https://unpkg.com/esm-env@1.2.1/false.js",
				"esm-env/node": "https://unpkg.com/esm-env@1.2.1/false.js",
				"clsx": "https://unpkg.com/clsx@2.1.1/dist/clsx.mjs"
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
<my-custom-element></my-custom-element>

<hr />

<p>Expected</p>
<Source />
