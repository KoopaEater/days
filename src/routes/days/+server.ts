import {DateTime} from 'luxon';
import {daysUntil} from "$lib/timeHelper";

export async function GET() {
    const elapsed = (await daysUntil(DateTime.now())).days;
    return new Response(JSON.stringify(elapsed));
}
