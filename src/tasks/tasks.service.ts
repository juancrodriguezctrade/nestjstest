import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){}
  
    async getAllTasks(user:User) : Promise<Task []> {
        const found = await this.taskRepository.find({where: { user }});
        //const found = await this.taskRepository.find();
        
        if(!found){
            throw new NotFoundException(`No tasks found`);
        }

        return found;
    }
    
    async getTaskById(id:string,user:User): Promise<Task>{
        const found = await this.taskRepository.findOne({where: {id,user}});
        
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        
        return found;
    }

    createTask(createTaskDto: CreateTaskDto, user:User): Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTaskById(id:string, user:User): Promise<void>{
        const result = await this.taskRepository.delete({id,user});
        
        if(result.affected == 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskStatus(id:string, status: TaskStatus, user:User): Promise<Task>{
        const task = await this.getTaskById(id,user);

        task.status = status;

        await this.taskRepository.save(task);

        return task;
    }
}
