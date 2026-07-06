<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/styles/colors.css';
	import '$lib/styles/app.css';
	import '$lib/styles/vars.css';
	import '$lib/webawesome.ts';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
