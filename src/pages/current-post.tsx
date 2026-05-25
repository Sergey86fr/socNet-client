
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useAppSelector } from "@/app/hooks"
import { useDeleteCommentMutation } from "@/app/services/commentsApi"
import { useDeletePostMutation, useGetPostByIdQuery, useLazyGetPostByIdQuery } from "@/app/services/postsApi"
import BackButton from "@/components/backButton/backButton"
import CreateComment from "@/components/createComment/createComment"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { BASE_URL } from "@/constants"
import { selectCurent } from "@/features/user/userSlice"
import { Trash, Heart, MessageCircle } from "lucide-react"
import { Link, useParams } from "react-router-dom"

const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params.id ?? "")
  const currentUser = useAppSelector(selectCurent)
    const [triggerGetPost] = useLazyGetPostByIdQuery();
     const[ triggerDeletePost] = useDeletePostMutation()
     const[ triggerDeleteComment] = useDeleteCommentMutation()
  if (!data) {
    return <h3>Нет такого поста!</h3>
  }

  const {
    id,
    authorId,
    author,
    createdAt,
    content,
    likes,
    likedByUser,
    comments,
  } = data

      const dateString = new Date(createdAt).toLocaleDateString()

      
    const handleDeletePost = async() => {
      try {
        await triggerDeletePost(id).unwrap()
        await triggerGetPost(id).unwrap()
        
      } catch (error) {
        console.log(error)
      }

    }

    const handleDeleteComment = async(commentId:string) => {
      try {
        await triggerDeleteComment(commentId).unwrap()
         await triggerGetPost(id).unwrap()
      } catch (error) {
        console.log(error)
      }
    }

  return (
  <>
  <BackButton />
   <Card className="mt-5">
    <CardHeader className="flex justify-between">
        <Link className="flex" to={`/users/${authorId}`}>
        <img className="h-10" src={`${BASE_URL}${author.avatarUrl ?? ''}`} alt="logo" />
        <div className="flex flex-col">
        <span>{author.name}</span>
        <span className="text-xs">{dateString}</span>

        </div>
        </Link>
    {authorId === currentUser?.id && <Button onClick={handleDeletePost}><Trash /></Button> }
    </CardHeader>
    <CardContent className="text-lg">{content}</CardContent>
    <CardFooter>
        <span className="flex gap-1 text-base mr-2 ">{likes.length < 1 ? '': likes.length} <Heart className="cursor-pointer" fill={likedByUser? 'red':'opacity'} /></span>
        <Link to={`/posts/${id}`}>
        <span className="flex gap-1 text-base">{comments.length< 1 ? '': comments.length} <MessageCircle /></span>
        </Link>
    </CardFooter>
  </Card>

  <CreateComment  />
{
  data.comments ? data.comments.map((c) => (
   <Card key={c.id} className="mt-5 ">
    <CardHeader className="flex justify-between">
      <div className="flex">
        <img className="h-10" src={`${BASE_URL}${c.user.avatarUrl ?? ''}`} alt="logo" />
        <Link to={`/users/${c.userId}`}>
        <span>{c.user.name}</span>
        </Link>
        
      </div>
    {c.userId === currentUser?.id && <Button onClick={() => handleDeleteComment(c.id)}><Trash /></Button> }
    </CardHeader>
    <CardContent>{c.content}</CardContent>
    {/* <CardFooter>
        <span className="flex gap-1 text-base mr-2 ">{likes.length < 1 ? '': likes.length} <Heart className="cursor-pointer" fill={likedByUser? 'red':'opacity'} /></span>
        <Link to={`/posts/${id}`}>
        <span className="flex gap-1 text-base">{comments.length< 1 ? '': comments.length} <MessageCircle /></span>
        </Link>
    </CardFooter> */}
  </Card>
  )): null
}
  
  </>
  )
}

export default CurrentPost
