import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common';

interface Options {
	name?: string;
}

@Injectable()
export class RequiredPipe implements PipeTransform {
	name: string = '';
	constructor(options: Options) {
		this.name = options.name;
	}
	transform(value: any, metadata: ArgumentMetadata) {
		const queryName = !this.name ? metadata.data : this.name;
		if (!value) {
			throw new BadRequestException(`${queryName} is required.`);
		}
	}
}
