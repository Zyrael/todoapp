import { PopoverClose } from '@radix-ui/react-popover';
import { Trash2 } from 'lucide-react';

import TodoInput from '@/components/TodoInput';
import TodoListRenderer from '@/components/TodoListRenderer';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  removeTodoList,
  setShowTodaysTodos,
} from '@/lib/features/todos/todosSlice';
import { removeCompletedTodos } from '@/lib/features/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Todo, TodoList } from '@/types/todos';

export default function TodoListTab() {
  const dispatch = useAppDispatch();
  const { showTodaysTodos, currentTodoListId, todoLists } = useAppSelector(
    (state) => state.todosSlice
  );

  const getTodoListForRender = () => {
    const today = new Date();
    if (showTodaysTodos) {
      const todos = todoLists.reduce((acc, todoList) => {
        todoList.todos.forEach((todo) => {
          if (
            todo.deadline &&
            new Date(todo.deadline).getDate() === today.getDate()
          ) {
            acc.push(todo);
          }
        });
        return acc;
      }, [] as Todo[]);
      return { title: 'Today', todos, deletable: false } as TodoList;
    }
    return todoLists.find((todoList) => todoList.id === currentTodoListId);
  };

  const currentTodoList = getTodoListForRender();

  const activeTodos =
    currentTodoList?.todos.filter((todo) => !todo.completed) || [];
  const completedTodos =
    currentTodoList?.todos.filter((todo) => todo.completed) || [];

  const handleRemoveTodoList = () => {
    dispatch(removeTodoList({ listId: currentTodoListId }));
    dispatch(setShowTodaysTodos({ showTodaysTodos: true }));
  };

  const handleRemoveCompleted = () => {
    dispatch(removeCompletedTodos({ listId: currentTodoListId }));
  };

  return (
    <div className='h-full w-full overflow-hidden border md:ml-[-1px]'>
      <div className='px-8 overflow-hidden'>
        <div className='flex h-16 items-center justify-center relative'>
          <div className='flex w-[90%] justify-center items-center overflow-hidden'>
            <div className='font-bold text-2xl overflow-hidden text-ellipsis'>
              {currentTodoList?.title}
            </div>
          </div>
          {currentTodoList?.deletable && (
            <Popover>
              <PopoverTrigger asChild>
                <Button className='absolute right-0 h-9 w-9'>
                  <Trash2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <div className='px-4 py-2 w-52'>
                  <p className='text-center'>
                    Are you sure you want to delete this list?
                  </p>
                  <div className='flex gap-4 mt-2 justify-center'>
                    <Button onClick={handleRemoveTodoList}>Yes</Button>
                    <PopoverClose className='border rounded-md px-4 text-sm font-medium hover:bg-accent transition-colors'>
                      No
                    </PopoverClose>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <Separator className=' bg-black' />
      </div>
      <div className='flex justify-center'>
        <ScrollArea className='h-[calc(100vh-80px)]'>
          {currentTodoList && currentTodoList?.todos.length !== 0 ? (
            <div className='flex justify-center w-full'>
              <Tabs defaultValue='all' className='w-[640px] flex flex-col'>
                <div className='flex justify-center mt-2 px-4 relative'>
                  <div className='flex items-center h-full absolute left-4'>
                    <span>Items left:&nbsp;{activeTodos.length}</span>
                  </div>
                  <TabsList>
                    <TabsTrigger value='all'>All</TabsTrigger>
                    <TabsTrigger value='active'>Active</TabsTrigger>
                    <TabsTrigger value='completed'>Completed</TabsTrigger>
                  </TabsList>
                  {!showTodaysTodos && (
                    <Button
                      onClick={handleRemoveCompleted}
                      className='absolute right-4'
                    >
                      Clear completed
                    </Button>
                  )}
                </div>
                <TabsContent value='all'>
                  <TodoListRenderer todos={currentTodoList.todos} />
                </TabsContent>
                <TabsContent value='active'>
                  <TodoListRenderer todos={activeTodos} />
                </TabsContent>
                <TabsContent value='completed'>
                  <TodoListRenderer todos={completedTodos} />
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className='flex justify-center mt-2'>
              <span className='text-xl'>Start by adding a todo</span>
            </div>
          )}
          {!showTodaysTodos && currentTodoList && <TodoInput />}
        </ScrollArea>
      </div>
    </div>
  );
}
