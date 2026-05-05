import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Post } from '@/types/post'
import { Eye } from 'lucide-react'

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base sm:text-lg font-semibold leading-tight line-clamp-2 pt-1">{post.title}</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Eye className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] rounded-2xl">
              <DialogHeader>
                <DialogTitle className='pr-6 text-xl font-bold leading-tight'>{post.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 gap-1.5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title</div>
                  <div className="text-base sm:text-lg text-slate-700 leading-relaxed">{post.title}</div>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content</div>
                  <div className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line">{post.body}</div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default PostCard