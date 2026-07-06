import {readFile} from 'fs/promises';

export async function GET() {
    const rawHighscore = await readFile('./db/highscore.txt', 'utf8');
    return new Response(rawHighscore);
}
