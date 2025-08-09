import { Module } from '@nestjs/common';
import { DummyDataService } from './dummy-data.service';
import { DummyDataController } from './dummy-data.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [DummyDataController],
  providers: [DummyDataService],
})
export class DummyDataModule {}
