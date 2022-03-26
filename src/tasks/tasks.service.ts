import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus} from './task.model';
import { v4 as uuid}  from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
    private tasks : Task [] = [];

    getAllTasks() : Task [] {
        return this.tasks;
    }

    getTaskById(id:String): Task{
        const found = this.tasks.find((task)=> task.id === id);

        if(!found)
            throw new NotFoundException();
    
        return found;
    }

    createTask(createTaskDto: CreateTaskDto):Task{
        const {title, description} = createTaskDto;

        const task : Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    deleteTaskById(id:String): void{
        const found = this.getTaskById(id);
        
        this.tasks = this.tasks.filter((task)=> task.id !== id);
    }

    updateTaskStatus(id:String, status: TaskStatus): Task{
        const task = this.getTaskById(id);

        task.status = status;

        return task;
    }

   
}
