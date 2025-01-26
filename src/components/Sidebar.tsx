import { PopoverClose } from '@radix-ui/react-popover';

import TodoListInput from '@/components/TodoListInput';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  removeAllTodoLists,
  setCurrentTodoListId,
} from '@/lib/features/todos/todosSlice';
import { setShowTodaysTodos } from '@/lib/features/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const { currentTodoListId, todoLists, showTodaysTodos } = useAppSelector(
    (state) => state.todosSlice
  );

  const handleSetCurrentTodoList = (listId: string) => () => {
    dispatch(setCurrentTodoListId({ listId }));
    dispatch(setShowTodaysTodos({ showTodaysTodos: false }));
  };

  const handleRemoveAllLists = () => {
    dispatch(removeAllTodoLists());
  };

  const handleShowTodaysTodos = () => {
    dispatch(setShowTodaysTodos({ showTodaysTodos: true }));
    dispatch(setCurrentTodoListId({ listId: '' }));
  };

  return (
    <ScrollArea className='border min-w-96 h-screen overflow-auto overflow-x-hidden'>
      <div>
        <div className='flex items-center p-4'>
          <Button
            variant={showTodaysTodos ? 'default' : 'outline'}
            className='text-xl w-full h-auto'
            onClick={handleShowTodaysTodos}
          >
            Today
          </Button>
        </div>
        <Separator />
      </div>
      <div className='flex flex-col gap-2 p-4 w-96'>
        {todoLists.map((todoList) => {
          return (
            <Button
              key={todoList.id}
              variant={
                todoList.id === currentTodoListId ? 'default' : 'outline'
              }
              onClick={handleSetCurrentTodoList(todoList.id)}
              className='text-xl h-auto flex justify-center'
            >
              <p className='max-w-full text-wrap break-words hyphens-auto texts text-start'>
                {todoList.title}
              </p>
            </Button>
          );
        })}
      </div>
      <Separator />
      <div className='p-4'>
        <TodoListInput />
      </div>
      <div className='flex px-4 pb-4'>
        <Popover>
          <PopoverTrigger asChild>
            <Button className='w-full'>Remove All Lists</Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <div className='px-4 py-2 w-52'>
              <p className='text-center'>
                Are you sure? This will erase all of your data.
              </p>
              <div className='flex gap-4 mt-2 justify-center '>
                <PopoverClose
                  onClick={handleRemoveAllLists}
                  className='border rounded-md px-4 py-2 shadow text-sm font-medium text-primary-foreground bg-primary transition-colors'
                >
                  Yes
                </PopoverClose>
                <PopoverClose className='border rounded-md px-4 py-2  text-sm font-medium hover:bg-accent transition-colors'>
                  No
                </PopoverClose>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </ScrollArea>
  );
}
