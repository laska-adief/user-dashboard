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
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-lg">{post.title}</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary"
              >
                <Eye className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='pr-2'>{post.title}</DialogTitle>
              </DialogHeader>
              <div className="mt-6 space-y-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
                <div className="grid grid-cols-1 gap-2">
                  <div className="text-slate-500 uppercase">title</div>
                  <div className="text-lg">{post.title}</div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="text-slate-500 uppercase">body</div>
                  <div className="text-lg">{post.body}</div>
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