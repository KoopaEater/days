<script lang="ts">
    import NumberInput from "$lib/components/selector/NumberInput.svelte";

    let { value = $bindable(0) } = $props();
</script>

<div id="wrapper">
    <button title="Lavere" type="button" onclick={() => value--}>
        <wa-icon name="angle-left"></wa-icon>
    </button>
    <NumberInput bind:value></NumberInput>
    <button title="Højere" type="button" onclick={() => value++}>
        <wa-icon name="angle-right"></wa-icon>
    </button>
</div>

<style>
    #wrapper {
        display:flex;
        flex-direction: row;
        justify-content: stretch;
        gap: 4px;
    }
</style>