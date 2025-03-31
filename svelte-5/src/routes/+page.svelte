<script lang="ts">
	import { compile } from 'svelte/compiler';
	import Source from './Source.svelte'; // The compiled component
	import rawSource from './Source.svelte?raw'; // The text to compile

	let source = $state(rawSource);
	let divElement: HTMLDivElement;
	let isBusy = $state(false);

	let myComponent: any;

	const compileSource = async () => {
		isBusy = true;
		divElement.innerHTML = '';
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
		myComponent = new Component({
			target: divElement,
			props: { arr: [4, 5, 6, 7, 8] }
		});
		isBusy = false;
	};

	const updateProps = () => {
		if (myComponent) {
			myComponent.$set({ arr: ['a', 'b', 'c'] });
		}
	};
</script>

<svelte:head>
	<!--
		How did we build this list? A few ways:
		1. Read the svelte dependencies, and try to include them:
	 	   https://app.unpkg.com/svelte@5.25.3/files/package.json
		2. Watch the browser console, if it says something like "Failed to resolve module specifier..."
		   then we check out the package on unpkg, scan the package.json
		We could / should automate this, but for proof-of-contept, I'm doing it manually.
	-->
	<script type="importmap">
		{
			"imports": {
				"svelte/internal/client": "https://cdn.jsdelivr.net/npm/svelte@5.25.3/src/internal/client/index.js",
				"svelte/internal/disclose-version": "https://cdn.jsdelivr.net/npm/svelte@5.25.3/src/internal/disclose-version.js",
				"svelte/internal/flags/legacy": "https://cdn.jsdelivr.net/npm/svelte@5.25.3/src/internal/flags/legacy.js",
				"svelte/legacy": "https://cdn.jsdelivr.net/npm/svelte@5.25.3/src/legacy/legacy-client.js",
				"esm-env": "https://cdn.jsdelivr.net/npm/esm-env@1.2.1/index.js",
				"esm-env/browser": "https://cdn.jsdelivr.net/npm/esm-env@1.2.1/true.js",
				"esm-env/development": "https://cdn.jsdelivr.net/npm/esm-env@1.2.1/false.js",
				"esm-env/node": "https://cdn.jsdelivr.net/npm/esm-env@1.2.1/false.js",
				"clsx": "https://cdn.jsdelivr.net/npm/clsx@2.1.1/dist/clsx.mjs"
			},
			"unused-unpkg-imports": {
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
<button onclick={compileSource} disabled={isBusy}>Compile</button>
<button onclick={updateProps} disabled={isBusy}>Change props</button>

{#if isBusy}
	<p>Compiling... (check your network tab)</p>
	<img src="https://imgs.xkcd.com/comics/compiling.png" alt="Compiling..." height="180" />
{/if}
<div bind:this={divElement}></div>

<hr />

<p>Expected (ie: pre-compiled)</p>
<Source />
