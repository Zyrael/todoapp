'use client';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import TodoListTab from '@/components/TodoListTab';
import { setTodos } from '@/lib/features/todos/todosSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTodosFromLocalStage = async () => {
      const savedTodos = await localStorage.getItem('todos');
      if (savedTodos) {
        dispatch(setTodos(JSON.parse(savedTodos)));
      }
      setIsLoading(false);
    };
    getTodosFromLocalStage();
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <div
          className='h-screen w-screen flex justify-center items-center'
          role='status'
        >
          <LoaderCircle className='animate-spin' width={48} height={48} />
        </div>
      )}
      {!isLoading && (
        <div className='w-screen flex justify-center'>
          <div className='flex container'>
            <Sidebar />
            <TodoListTab />
          </div>
        </div>
      )}
    </>
  );
}
