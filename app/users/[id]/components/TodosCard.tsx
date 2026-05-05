import { Badge } from '@/components/ui/badge'
import { Todo } from '@/types/todo'

const TodosCard = ({ todos }: { todos: Todo[] }) => {
  const sortedTodos = todos.sort((a, b) => Number(a.completed) - Number(b.completed))

  return (
    <div className='grid grid-cols-1 gap-4'>
      {
        sortedTodos.map((todo: Todo, index: number) => (
          <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 border rounded-2xl p-4 justify-between hover:bg-slate-50 transition-colors'>
            <span className='text-base sm:text-lg font-medium leading-snug'>{todo.title}</span>
            <Badge variant={todo.completed ? "default" : "outline"}>
              {todo.completed ? "Completed" : "Pending"}
            </Badge>
          </div>
        ))
      }
    </div>
  )
}

export default TodosCard