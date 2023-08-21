import { HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { randomUUID } from "crypto";
import type { FetchResponse } from "deta/dist/types/types/base/response";
import type { ObjectType } from "deta/dist/types/types/basic";
import type { BaseInst, DetaInst, VibelyBase } from './types';
import { BaseModel } from "src/models/BaseModel";
import { replaceKeyValues } from "src/utils";

export type DetaObject = ObjectType;
type DetaModel = BaseModel | ObjectType;

type NoKey<T extends DetaModel> = Omit<T, 'key'>;

export class Model<T extends DetaModel> {
	private deta: DetaInst;
	private base: BaseInst;

	constructor(deta: DetaInst, basename: VibelyBase){
		this.deta = deta;
		this.base = this.deta.Base(basename);
	}
	
	fetch(args?: Partial<T>): Observable<FetchResponse> {
		return new Observable(subscriber => {
			this.base.fetch(args as ObjectType).then(fetchRes => {
				subscriber.next(fetchRes);
				subscriber.complete();
			});
		});
	}

	getMany(args: Partial<T>): Observable<T[]> {
		return new Observable<T[]>(subscriber => {
			this.base.fetch(args as ObjectType).then(fetchRes => {
				subscriber.next(fetchRes.items as T[]);
				subscriber.complete();
			});
		});
	}

	get(args: Partial<T>, index: number = 0): Observable<T> {
		return new Observable<T>(subscriber => {
			this.base.fetch(args as ObjectType).then(fetchRes => {
				const item = fetchRes.items.at(index) as T;
				if (item) {
					subscriber.next(item);
					subscriber.complete();					
				} else {
					// subscriber.error({ message: "Not found", status: HttpStatus.NOT_FOUND } as HttpError);
					subscriber.error("Not found");
				}
			});
		});
	}

	delete(args: Partial<T>){
		return new Observable<T>(subscriber => {
			this.base.fetch(args as ObjectType).then(x => {
				const item = x.items.at(0) as T;
				if (!item) {
					subscriber.error({ status: HttpStatus.NOT_FOUND, message: "Not found" } as HttpError);
				} else {
					this.base.delete(item.key as string).then(() => {
						subscriber.next(item);
						subscriber.complete();
					}).catch(err => {
						subscriber.error(err);
					});					
				}
			});
		})
	}

	deleteMany(args: Partial<T>){
		return new Observable<void>(subscriber => {
			this.base.fetch(args as ObjectType).then(x => {
				const proms: Promise<any>[] = [];
				(x.items as T[]).forEach(x => {
					proms.push(this.base.delete(x.key as string));
				});
				Promise.all(proms).then(() => {
					subscriber.next();
					subscriber.complete();					
				});
			});
		})	
	}

	update(args: Partial<NoKey<T>>, key: string){
		return new Observable<T>(subscriber => {
			this.base.get(key).then(x => {
				this.base.update(args as ObjectType, key).then(() => {
					subscriber.next(replaceKeyValues(x, args) as T);
					subscriber.complete();
				}).catch(_err => {
					const error: HttpError = { status: HttpStatus.NOT_FOUND, message: "Not found" };
					subscriber.error(error);
				});
			});
		});
	}

	put(model: NoKey<T>, uuidKey: boolean = false): Observable<T> {
		return new Observable<T>(subscriber => {
			this.base.put(model as ObjectType, uuidKey ? randomUUID() : undefined).then(x => {
				subscriber.next(x as T);
				subscriber.complete();
			});
		});
	}
}
