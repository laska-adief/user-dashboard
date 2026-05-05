import { Badge } from '@/components/ui/badge'
import { Todo } from '@/types/todo'

const TodosCard = ({ todos }: { todos: Todo[] }) => {
  const sortedTodos = todos.sort((a, b) => Number(a.completed) - Number(b.completed))

  return (
    <div className='grid grid-cols-1 gap-4'>
      {
        sortedTodos.map((todo: Todo, index: number) => (
          <div key={index} className='flex items-center gap-2 border rounded-2xl p-4 justify-between'>
            <span className='text-lg'>{todo.title}</span>
            <Badge variant={todo.completed ? "default" : "outline"}>{todo.completed ? "Completed" : "Pending"}</Badge>
          </div>
        ))
      }
    </div>
  )
}

export default TodosCard