import { DateTime, Interval } from 'luxon';
import { readFile } from 'fs/promises';

const monthMap: Map<number, string> = new Map();
monthMap.set(1, 'Jan');
monthMap.set(2, 'Feb');
monthMap.set(3, 'Mar');
monthMap.set(4, 'Apr');
monthMap.set(5, 'May');
monthMap.set(6, 'Jun');
monthMap.set(7, 'Jul');
monthMap.set(8, 'Aug');
monthMap.set(9, 'Sep');
monthMap.set(10, 'Oct');
monthMap.set(11, 'Nov');
monthMap.set(12, 'Dec');

export function numberToMonth(numMonth: number) {
	return monthMap.get(numMonth);
}

export async function daysUntil(date: DateTime) {
	const rawSince = await readFile('./db/since.txt', 'utf8');
	const since = DateTime.fromISO(rawSince);

	const interval = Interval.fromDateTimes(since, date);
	return {
		since: since,
		days: Math.floor(interval.length('days'))
	};
}
