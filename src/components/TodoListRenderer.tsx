import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types/todos';

type TodoListProps = {
  todos: Todo[];
};

export default function TodoListRenderer({ todos }: TodoListProps) {
  return (
    <div className='px-4 flex flex-col gap-2'>
      {todos.map((todo, index) => {
        return <TodoItem key={index} todo={todo} />;
      })}
    </div>
  );
}
