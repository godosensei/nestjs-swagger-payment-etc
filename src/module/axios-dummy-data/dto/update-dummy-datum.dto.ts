import { PartialType } from '@nestjs/swagger';
import { CreateDummyDatumDto } from './create-dummy-datum.dto';

export class UpdateDummyDatumDto extends PartialType(CreateDummyDatumDto) {}
