import { range } from 'lodash';
import { Observable } from 'rxjs';

export function limitArray(array: any[], limit: number, offset: number) {
	for (const _x of range(offset)) {
		array.shift();
	}
	array.splice(limit, array.length);
	return array;
}

export function createReturnableObservable<T>(val: T): Observable<T> {
	return new Observable<T>(subscribe => {
		subscribe.next(val);
		subscribe.complete();
	});
}

export function replaceKeyValues(obj: any, updates: any){
	for (const x of Object.keys(updates)) {
		obj[x] = updates[x];
	}
	return obj;
}
