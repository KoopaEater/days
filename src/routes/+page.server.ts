import { readFile } from 'fs/promises';
import {daysUntil, numberToMonth} from "$lib/timeHelper";
import type {PageServerLoad} from "./$types";
import {DateTime} from "luxon";

export const load: PageServerLoad = async () => {
    const res = await daysUntil(DateTime.now());
    const since = `${numberToMonth(res.since.month)} ${res.since.day}, ${res.since.year}`;
    const elapsed = res.days;
    const rawHighscore = await readFile('./db/highscore.txt', 'utf8');
    const highscore = Math.max(elapsed, Number(rawHighscore.trim()));

    return { highscore, since, elapsed };
}
