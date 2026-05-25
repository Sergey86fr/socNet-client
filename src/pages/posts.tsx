import { useGetAllPostsQuery } from "@/app/services/postsApi"
import CreatePost from "@/components/createPost/createPost"
import Post from "@/components/post/post"

const Posts = () => {
  const { data } = useGetAllPostsQuery()
  console.log(data, "posts")
  return (
    <div className="w-full">
      <div className="w-full">
        <CreatePost />
      </div>
       <div className="w-full space-y-4">
      {data &&
        data.length > 0 &&
        data.map(p => <Post 
        key={p.id} 
        id={p.id} 
        authorId={p.authorId} 
        avatarUrl={p.author.avatarUrl ?? ''}
        name={p.author.name ?? ''}
        images={p.images}
        createdAt={p.createdAt}
        content={p.content}
        likes={p.likes.length}
        likedByUser={p.likedByUser}
        comments={p.comments.length}
        />)}
        </div>
    </div>
  )
}

export default Posts
