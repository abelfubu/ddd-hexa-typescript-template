import { type UUID } from 'node:crypto'

import { db, withPersistenceHandling } from '@core'

import { type TaskRepositoryPort } from '../application/task.repository.port'
import { Task } from '../domain/task.entity'

export const TaskRepository: TaskRepositoryPort = {
  get: (): Promise<Task[]> => {
    return withPersistenceHandling(() => db('tasks').select('*'), {
      queryName: 'TaskRepository.get',
      table: 'tasks',
    })
  },

  getOne: (id: UUID): Promise<Task | null> => {
    return withPersistenceHandling(() => db('tasks').where({ id }).first(), {
      queryName: 'TaskRepository.getOne',
      table: 'tasks',
    })
  },

  save: async (task: Task): Promise<Task> => {
    await withPersistenceHandling(() => db('tasks').insert(task, '*'), {
      queryName: 'TaskRepository.save',
      table: 'tasks',
    })
    return task
  },

  update: async (
    id: UUID,
    task: Pick<Task, 'title' | 'description' | 'completed'>,
  ): Promise<void> => {
    await withPersistenceHandling(
      () => db('tasks').where({ id }).update(task),
      {
        queryName: 'TaskRepository.update',
        table: 'tasks',
      },
    )
  },

  delete: async (id: string): Promise<void> => {
    await withPersistenceHandling(() => db('tasks').where({ id }).del(), {
      queryName: 'TaskRepository.delete',
      table: 'tasks',
    })
  },

  toggleDone: async (id: string): Promise<void> => {
    await withPersistenceHandling(
      () =>
        db('tasks')
          .where({ id })
          .update({
            completed: db.raw('NOT completed'),
          }),
      {
        queryName: 'TaskRepository.toggleDone',
        table: 'tasks',
      },
    )
  },
}
