'use client';

import cn from 'classnames';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  setCurrentTodoListId,
  setShowTodaysTodos,
  toggleTodo,
} from '@/lib/features/todos/todosSlice';
import { removeTodo } from '@/lib/features/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Todo } from '@/types/todos';

type TodoItemProps = {
  todo: Todo;
};

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();

  const { showTodaysTodos, todoLists } = useAppSelector(
    (state) => state.todosSlice
  );

  const handleCompleteTodo = () => {
    dispatch(toggleTodo({ todoId: todo.id, parentId: todo.parentId }));
  };

  const handleRemoveTodo = () => {
    dispatch(removeTodo({ todoId: todo.id, parentId: todo.parentId }));
  };

  const getDateString = (deadline: number) => {
    const date = new Date(deadline);
    return format(date, 'PPP');
  };

  const getParentListTitle = () => {
    const parentList = todoLists.find(
      (todoList) => todoList.id === todo.parentId
    );
    if (parentList) {
      return parentList.title;
    }
    return '';
  };

  const handleGoToParentList = () => {
    dispatch(setShowTodaysTodos({ showTodaysTodos: false }));
    dispatch(setCurrentTodoListId({ listId: todo.parentId }));
  };

  return (
    <div className='border rounded-lg p-2'>
      <div className='flex gap-4'>
        <div className='flex items-center'>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleCompleteTodo}
            className='w-6 h-6 accent-blue-500'
          />
        </div>
        <div
          className={cn('text-xl flex items-center overflow-hidden', {
            'line-through opacity-50': todo.completed,
          })}
        >
          <p className='text-wrap break-words hyphens-auto w-full'>
            {todo.text}
          </p>
        </div>
        <div className='flex items-center ml-auto'>
          <Button onClick={handleRemoveTodo} className='h-9 w-9'>
            <Trash2 />
          </Button>
        </div>
      </div>

      {showTodaysTodos && (
        <div className='mt-1 pl-10 flex'>
          <div
            className='max-w-48 overflow-hidden text-ellipsis border rounded-md px-1 text-sm opacity-70 cursor-pointer hover:text-green-600 hover:border-green-500 transition-colors'
            onClick={handleGoToParentList}
          >
            {getParentListTitle()}
          </div>
        </div>
      )}
      {todo.deadline && (
        <div className='mt-1 pl-10'>Due to: {getDateString(todo.deadline)}</div>
      )}
    </div>
  );
}
