import { UUID } from 'crypto'
import { Task } from '../domain/task.entity'

export interface TaskRepositoryPort {
  get: () => Promise<Task[]>
  getOne: (id: UUID) => Promise<Task | null>
  save: (task: Task) => Promise<Task>
  update(
    id: UUID,
    task: Pick<Task, 'title' | 'description' | 'completed'>,
  ): Promise<void>
  delete(id: string): Promise<void>
  toggleDone(id: string): Promise<void>
}
