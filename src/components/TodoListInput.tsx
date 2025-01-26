import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addTodoList } from '@/lib/features/todos/todosSlice';
import { useAppDispatch } from '@/lib/hooks';

export default function TodoListInput() {
  const dispatch = useAppDispatch();

  const [newTodoListTitle, setNewTodoListTitle] = useState('');

  const handleAddTodoList = () => {
    if (newTodoListTitle === '') {
      return;
    }
    dispatch(addTodoList({ listTitle: newTodoListTitle }));
    setNewTodoListTitle('');
  };

  return (
    <div className='flex gap-2'>
      <Input
        onChange={(e) => setNewTodoListTitle(e.target.value)}
        value={newTodoListTitle}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddTodoList();
            setNewTodoListTitle('');
          }
        }}
        placeholder='Add a new list'
      />
      <Button onMouseDown={handleAddTodoList} className='w-9 h-9'>
        <Plus />
      </Button>
    </div>
  );
}
