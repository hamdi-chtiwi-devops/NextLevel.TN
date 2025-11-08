import { mockForumPosts } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageSquare } from 'lucide-react';

export function CourseForum() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea placeholder="Ask a question or share your thoughts..." />
              <div className="flex justify-end">
                <Button>Post</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {mockForumPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author}</span>
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <p className="mt-2 text-foreground">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.replies.length} Replies</span>
                    </Button>
                  </div>

                  {post.replies.length > 0 && (
                    <div className="space-y-4 border-l-2 pl-6 mt-4">
                      {post.replies.map((reply) => (
                         <div key={reply.id} className="flex gap-4">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={reply.authorAvatar} alt={reply.author} />
                                <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{reply.author}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="mt-1 text-sm">{reply.content}</p>
                            </div>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
