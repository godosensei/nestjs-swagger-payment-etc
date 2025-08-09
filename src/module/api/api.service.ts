import { Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Injectable()
export class ApiService {
  create(createApiDto: CreateApiDto) {
    return 'created';
  }

  findAll() {
    return `found all`;
  }

  findOne(id: number) {
    return `found with id #${id} `;
  }

  update(id: number, updateApiDto: UpdateApiDto) {
    return `updated at id #${id} `;
  }

  remove(id: number) {
    return ` removed at id #${id} `;
  }
}
