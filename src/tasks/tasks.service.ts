import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
  
    async getAllTasks() : Promise<Task []> {
        const found = await this.taskRepository.find();
        
        if(!found){
            throw new NotFoundException(`No tasks found`);
        }

        return found;
    }
    
    async getTaskById(id:string): Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById(id:string): Promise<void>{
        const result = await this.taskRepository.delete(id);
        
        if(result.affected == 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(id:string, status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);

        task.status = status;

        await this.taskRepository.save(task);

        return task;
    }
}
