<script lang="ts">
    import type {PageProps} from "./$types";
    import NumberSelector from "$lib/components/selector/NumberSelector.svelte";
    import {DateTime} from "luxon";
    import {invalidateAll} from "$app/navigation";

    let { data }: PageProps = $props();

    let resetDialog: HTMLDialogElement;

    let resetDaysAgo = $state(0);
    let resetPassword = $state("");

    let resetInfo: string | undefined = $state(undefined);

    async function submitReset() {
        resetInfo = undefined;
        const resetDate = DateTime.now().startOf('day').minus({days: resetDaysAgo});
        const res = await fetch("/reset", {
            method: "POST",
            body: JSON.stringify({
                'newDate': resetDate,
                'password': resetPassword,
            }),
            headers: {"Content-Type": "application/json"},
        });

        if (res.status === 200) {
            resetDialog.close();
            resetDaysAgo = 0;
            resetPassword = "";
            await invalidateAll();
        } else {
            resetInfo = "Something went wrong... Try again";
        }
    }
</script>

<div id="wrapper">
    <div id="inner-wrapper">
        <h1>{data.elapsed}</h1>
        <p>days free</p>
        <div class="spacer"></div>
        <p>Since: {data.since}</p>
        <p>Best streak: {data.highscore} days</p>
    </div>
    <div id="button-wrapper">
        <button id="reset" command="show-modal" commandfor="reset-dialog">
            RESET
        </button>
    </div>

</div>

<dialog bind:this={resetDialog} id="reset-dialog">
    <form onsubmit={submitReset}>
        <div class="form-line">
            <label for="reset-days-ago">How many days ago?</label>
            <div id="reset-days-ago"><NumberSelector bind:value={resetDaysAgo}/></div>
        </div>
        <div class="form-line">
            <label for="reset-password">Password:</label>
            <input type="password" id="reset-password" bind:value={resetPassword}/>
        </div>
        {#if resetInfo}
            <div class="info-line">
                <p><em>Something went wrong... Try again</em></p>
            </div>
        {/if}
        <div class="submit-line">
            <button id="reset-cancel-btn" type="button" command="close" commandfor="reset-dialog">Cancel</button>
            <button id="reset-confirm-btn" type="submit">Confirm</button>
        </div>
    </form>
</dialog>

<style>
    #wrapper {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #inner-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    h1 {
        font-size: 8rem;
    }

    .spacer {
        height: 4ex;
    }

    #button-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #reset {
        background: var(--color-primary);
        border-radius: 10px;
        height: 50px;
        margin: 5px;
        font-size: 1rem;
        font-weight: bold;
    }
    #reset:hover {
        background: var(--color-primary-dark);
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .form-line {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 32px;
    }

    .info-line {
        display: flex;
        justify-content: end;
    }

    .submit-line {
        display: flex;
        justify-content: end;
        gap: 16px;
        margin-top: 32px;
    }

    #reset-cancel-btn {
        background: indianred;
        &:hover {
            background: darkred;
        }
    }

    #reset-confirm-btn {
        background: var(--color-primary);
        &:hover {
            background: var(--color-primary-dark);
        }
    }
</style>