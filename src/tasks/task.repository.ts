import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task-dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task) 
export class TaskRepository extends Repository<Task>{
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const {title, description} = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.save(task);

        return task;
    }
}