import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Task } from '../../tasks/entities/task.entity';

@Table({ tableName: 'Users' })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @HasMany(() => Task)
  tasks: Task[];
}
