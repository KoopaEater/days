import {readFile} from 'fs/promises';

export async function GET() {
    const rawSince = await readFile('./db/since.txt', 'utf8');
    return new Response(rawSince);
}
