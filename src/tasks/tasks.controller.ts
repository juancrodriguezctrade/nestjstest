import { Body, Controller, Get, Param, Post, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskStatusDto } from './dto/update-task-dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(@GetUser() user:User) : Promise<Task []> {
        return this.tasksService.getAllTasks(user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string,@GetUser() user:User): Promise<Task>{
        return this.tasksService.getTaskById(id,user);
    }

    
    @Post()
    createTask(@Body () createTaskDto : CreateTaskDto, @GetUser() user:User): Promise<Task>{
        return this.tasksService.createTask(createTaskDto,user);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string, @GetUser() user:User): Promise<void>{
        return this.tasksService.deleteTaskById(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user:User): Promise<Task>{

        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id,status,user);
    }

}
