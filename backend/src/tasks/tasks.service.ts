import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    return this.taskModel.create({
      ...createTaskDto,
      userId,
    });
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string, userId: string): Promise<Task> {
    const task = await this.taskModel.findByPk(id);

    if (!task) {
      throw new NotFoundException(`No task found ${id}`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this task.',
      );
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    userId: string,
  ): Promise<Task> {
    const task = await this.findOne(id, userId);

    await task.update(updateTaskDto);

    return task;
  }

  async remove(id: string, userId: string): Promise<void> {
    const task = await this.findOne(id, userId);
    await task.destroy();
  }
}
