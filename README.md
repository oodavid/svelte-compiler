# Svelte Compile

I've been following this SO answer to compile a component in-browser and render it:
https://stackoverflow.com/a/73339006

✅  Svelte 4 - works!

- This project uses svelte 4.2.18 in package.json.
- Compile a source string (loaded via ?raw)
- Uses `importmap` to load the packages via unpkg
- This works!

❌ Svelte 5 - does not work

- This uses 5.22.0 in the package
- Similar code to the above
- This fails with the following error:
  `Uncaught (in promise) TypeError: Failed to resolve module specifier "esm-env". Relative references must start with either "/", "./", or "../".`
