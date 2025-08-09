import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DummyDataService } from './dummy-data.service';
import { CreateDummyDatumDto } from './dto/create-dummy-datum.dto';
import { UpdateDummyDatumDto } from './dto/update-dummy-datum.dto';



@Controller('dummy-data')
export class DummyDataController {
  constructor(
    private readonly dummyDataService: DummyDataService,
) {
}

  @Post()
  create() {
    return this.dummyDataService.create();
  }

  @Get()
  findAll() {
    return this.dummyDataService.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dummyDataService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDummyDatumDto: UpdateDummyDatumDto) {
  //   return this.dummyDataService.update(+id, updateDummyDatumDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dummyDataService.remove(+id);
  // }
}
