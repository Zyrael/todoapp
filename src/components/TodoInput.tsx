import 'react-calendar/dist/Calendar.css';

import cn from 'classnames';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { addTodo } from '@/lib/features/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function TodoInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [date, setDate] = useState<Date>();

  const { currentTodoListId } = useAppSelector((state) => state.todosSlice);

  useEffect(() => {
    setText('');
    setDate(undefined);
  }, [currentTodoListId]);

  const handleAddTodo = () => {
    if (text === '') {
      return;
    }

    const newTodo: { text: string; parentId: string; deadline?: number } = {
      text,
      parentId: currentTodoListId,
    };
    if (date) {
      newTodo.deadline = Date.parse(date.toUTCString());
    }
    dispatch(addTodo(newTodo));
    setText('');
    setDate(undefined);
    inputRef.current?.focus();
  };

  return (
    <div className='px-4 py-2'>
      <div className='flex gap-2'>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
          ref={inputRef}
          placeholder='Write your todo here'
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleAddTodo} className='w-9 h-9'>
          <Plus />
        </Button>
      </div>
    </div>
  );
}
