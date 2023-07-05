import { range } from 'lodash';

export function limitArray(array: any[], limit: number, offset: number) {
	for (const _x of range(offset)) {
		array.shift();
	}
	array.splice(limit, array.length);
	return array;
}
