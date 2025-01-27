'use client';
import cn from 'classnames';
import { LoaderCircle } from 'lucide-react';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

import Sidebar from '@/components/Sidebar';
import TodoListTab from '@/components/TodoListTab';
import { setTodos } from '@/lib/features/todos/todosSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function Home() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpened, setSidebarOpened] = useState(false);

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

  const handleOpenSidebar = () => {
    setSidebarOpened(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpened(false);
  };

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
          <div className='md:container flex relative'>
            <div
              className={cn(
                'md:max-w-96 w-screen h-screen absolute md:left-0 md:block bg-white z-50 transition-all',
                {
                  'left-[-100vw]': !sidebarOpened,
                  'left-0': sidebarOpened,
                }
              )}
            >
              <Sidebar handleCloseSidebar={handleCloseSidebar} />
            </div>
            <div className='h-screen w-screen md:w-full md:ml-96 relative '>
              <div
                className='absolute left-6 top-4 z-10 md:hidden'
                onClick={handleOpenSidebar}
              >
                <Menu width={40} height={40} />
              </div>
              <TodoListTab />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
