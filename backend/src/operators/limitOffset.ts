import { range } from "lodash";
import { Observable } from "rxjs"

// observable version of limitPosts
export const limitOffset = <T>(limit: number, offset: number) => {
	return (observable: Observable<T[]>) => new Observable<T>(subscriber => {
		const subs = observable.subscribe(arr => {
			for (const _x of range(offset)) {
				arr.shift();
			}
			arr.splice(limit, arr.length);
			arr.forEach(x => {
				subscriber.next(x);
			});
			subscriber.complete();
		});
		return () => {
			subs.unsubscribe();
		};
	});
};
