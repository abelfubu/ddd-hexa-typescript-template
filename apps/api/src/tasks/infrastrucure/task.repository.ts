import { UUID } from 'crypto'

import { db } from '@core'

import { TaskRepositoryPort } from '../application/task.repository.port'
import { Task } from '../domain/task.entity'

export const TaskRepository: TaskRepositoryPort = {
  get: (): Promise<Task[]> => {
    return db('tasks').select('*')
  },

  getOne: (id: string): Promise<Task | null> => {
    return db('tasks').where({ id }).first()
  },

  save: async (task: Task): Promise<Task> => {
    await db('tasks').insert(task, '*')
    return task
  },

  update: async (
    id: UUID,
    task: Pick<Task, 'title' | 'description' | 'completed'>,
  ): Promise<void> => {
    await db('tasks').where({ id }).update(task)
  },

  delete: async (id: string): Promise<void> => {
    await db('tasks').where({ id }).del()
  },

  toggleDone: async (id: string): Promise<void> => {
    await db('tasks')
      .where({ id })
      .update({
        done: db.raw('NOT done'),
      })
  },
}
