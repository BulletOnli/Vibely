import { FetchResponse } from "deta/dist/types/types/base/response"
import { Observable } from "rxjs"

export const sort = <T>(comparator: (a: T, b: T) => number) => {
	return (observable: Observable<T[]>) => new Observable<T>(subscriber => {
		const subscription = observable.subscribe(array => {
			array.sort(comparator);
			array.forEach(val => {
				subscriber.next(val);
			});
			subscriber.complete();
		});
		return () => {
			subscription.unsubscribe();
		};
	});
};

export const getItems = <T>() => {
	return (observable: Observable<FetchResponse>) => new Observable<T[]>(subscriber => {
		const subscription = observable.subscribe(fetchRes => {
			subscriber.next(fetchRes.items as T[]);
		});
		return () => {
			subscription.unsubscribe();
		};
	});
};

export { limitOffset } from './limitOffset';
