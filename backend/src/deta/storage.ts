import { Observable, tap } from 'rxjs';
import type { DriveInst, DetaInst, VibelyDrive } from './types';
import { lookup } from 'mime-types';
import { basename } from 'path';

interface File {
	data: Buffer;
	contentType: string;
}

export class Storage {
	private deta: DetaInst;
	private drive: DriveInst;
	constructor(deta: DetaInst, drivename: VibelyDrive){
		this.deta = deta;
		this.drive = this.deta.Drive(drivename);
	}

	upload(path: string, data: Buffer){
		return new Observable<string>(subscriber => {
			const mimetype = lookup(basename(path)) || '';
			this.drive.put(path, { data, contentType: mimetype }).then(x => {
				subscriber.next(x);
				subscriber.complete();
			});
		});
	}

	getFile(path: (list: string[]) => string): Observable<File>;
	getFile(path: string): Observable<File>;
	getFile(path: any): Observable<File> {
		return new Observable<File>(subscriber => {
			let name = typeof path === 'string' ? path : '';
			this.list().pipe(tap(x => {
				if (typeof path === 'function') {
					name = path(x);
				}
				this.drive.get(name).then(x => {
					x.arrayBuffer().then(y => {
						subscriber.next({
							data: Buffer.from(y),
							contentType: lookup(basename(name)) || ''
						});
						subscriber.complete();
					});
				});
			})).subscribe();
		});
	}

	list(){
		return new Observable<string[]>(subscriber => {
			this.drive.list().then(x => {
				subscriber.next(x.names);
				subscriber.complete();
			});
		});
	}
}
