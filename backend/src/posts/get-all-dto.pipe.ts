import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
import { GetAllDto } from './dto';

@Injectable()
export class ParseLimOffPipe implements PipeTransform<GetAllDto> {
	transform(value: GetAllDto, _args: ArgumentMetadata) {
		const { limit, offset } = value;
		const defaultLim = 15;
		const defaultOff = 0;
		value.limit = defaultLim;
		value.offset = defaultOff;

		if (limit || offset) {
			value.limit = parseInt(limit as unknown as string) || defaultLim;
			value.offset = parseInt(offset as unknown as string) || defaultOff;
		}
		return value;
	}
}
