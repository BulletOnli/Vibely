import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform
} from '@nestjs/common';

interface Options {
	name?: string;
}

export class RequiredPipe implements PipeTransform {
	name: string = '';
	constructor(options: Options) {
		if (options?.name) {
			this.name = options.name;
		}
	}
	transform(value: any, metadata: ArgumentMetadata) {
		const queryName = !this.name ? metadata.data : this.name;
		if (!value) {
			throw new BadRequestException(`${queryName} is required.`);
		}
		return value;
	}
}
