import { Injectable } from '@nestjs/common';
import { CreateDummyDatumDto } from './dto/create-dummy-datum.dto';
import { UpdateDummyDatumDto } from './dto/update-dummy-datum.dto';
import * as fs from 'fs'
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';

  const data = JSON.parse(fs.readFileSync('common/seeding/seed-data/data.json','utf-8'))



@Injectable()
export class DummyDataService {
constructor(private readonly httpService: HttpService){}


  async create() {
try {
  return await axios.post('/api/dummy-data',data)
}
catch(err)
{
  console.error(err)
  throw err

}
 }

  async findAll() {
try {
  return axios.get('/api/dummy-data')
}
catch(err){
 console.error(err)
  throw err
}
 }
  findOne(id: number) {
    return `This action returns a #${id} dummyDatum`;
  }

  update(id: number, updateDummyDatumDto: UpdateDummyDatumDto) {
    return `This action updates a #${id} dummyDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} dummyDatum`;
  }
}
