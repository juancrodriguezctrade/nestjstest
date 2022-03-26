import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { WorksModule } from './works/works.module';

@Module({
  imports: [TasksModule, WorksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
