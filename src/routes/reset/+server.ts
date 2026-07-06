import {readFile, writeFile} from 'fs/promises';
import { env } from '$env/dynamic/private';
import {DateTime} from 'luxon';
import {daysUntil} from "$lib/timeHelper";

export async function POST({ request }) {
    const { newDate, password } = await request.json();

    if (password !== env.PASSWORD) {
        return new Response(
            JSON.stringify({ error: 'Invalid password' }),
            { status: 401 }
        );
    }

    // Parse and validate the incoming date
    const dt = DateTime.fromISO(newDate);

    if (!dt.isValid) {
        return new Response(
            JSON.stringify({ error: 'Invalid date format' }),
            { status: 400 }
        );
    }

    const elapsed = (await daysUntil(DateTime.now().startOf('day'))).days;
    const rawHighscore = await readFile('./db/highscore.txt', 'utf8');
    const highscore = Number(rawHighscore.trim());

    if (elapsed > highscore) {
        await writeFile('./db/highscore.txt', String(elapsed));
    }

    await writeFile('./db/since.txt', dt.toISODate());

    return new Response("ok");
}
