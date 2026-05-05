import { Post } from '@/types/post'
import PostCard from './PostCard'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const AllPostsCard = ({ posts }: { posts: Post[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs">
          View All ({posts.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-2/4">
        <DialogHeader>
          <DialogTitle>All Posts ({posts.length})</DialogTitle>
        </DialogHeader>
        <div className='max-h-[calc(100vh-10rem)] overflow-y-auto'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AllPostsCard