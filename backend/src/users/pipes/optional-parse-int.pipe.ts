import { ArgumentMetadata, Injectable, ParseIntPipe } from '@nestjs/common';
import { isEmpty } from 'lodash';

interface Options {
	defaultValue: number;
}

@Injectable()
export class OptionalParseIntPipe extends ParseIntPipe {
	options: Options;
	constructor(options: Options) {
		super();
		this.options = options;
	}
	async transform(value: string, _metadata: ArgumentMetadata): Promise<number> {
		if (isEmpty(value)) {
			return this.options.defaultValue;
		} else if (!this.isNumeric(value)) {
			throw this.exceptionFactory(
				'Validation failed (numeric string is expected)'
			);
		}
		return parseInt(value, 10);
	}
}
