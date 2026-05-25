/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { BASE_URL } from "@/constants"
import { Heart, MessageCircle, Trash } from "lucide-react"
import { useLikePostMutation, useUnlikePostMutation } from "@/app/services/likesApi"
import { useDeletePostMutation, useLazyGetAllPostsQuery } from "@/app/services/postsApi"
import { useAppSelector } from "@/app/hooks"
import { selectCurent } from "@/features/user/userSlice"
import { Button } from "../ui/button"


type IPostProps = {
  id: string
  authorId: string
  avatarUrl:string
  name: string
  images: string[]
  createdAt: Date
  content: string
  likes: number
  likedByUser: boolean
  comments:number
}



const Post = ({id, authorId, avatarUrl, name, images, createdAt, content, likes,likedByUser,comments}:IPostProps) => {


  const [likePost] = useLikePostMutation();
  const[unlikePost] = useUnlikePostMutation()
   const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
   const[ triggerDeletePost] = useDeletePostMutation()
   const currentUser = useAppSelector(selectCurent)


    const dateString = new Date(createdAt).toLocaleDateString()

    const handleLike = async () => {
      try {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          likedByUser? await unlikePost(id).unwrap():await likePost({postId:id}).unwrap()
          await triggerGetAllPosts().unwrap()
  
     
      } catch (error) {
        console.log(error)
      }
    }

    const handleDeletePost = async() => {
await triggerDeletePost(id).unwrap()
await triggerGetAllPosts().unwrap()

    }
  return <Card className="mt-5 w-full mx-0 rounded-none sm:rounded-lg md:rounded-xl overflow-hidden">
    <CardHeader className="flex justify-between">
        <Link className="flex gap-3" to={`/users/${authorId}`}>
        <img className="h-10" src={`${BASE_URL}${avatarUrl}`} alt="logo" />
        <div className="flex flex-col gap-1">

        <span>{name}</span>
        <span className="text-xs">{dateString}</span>
        </div>
        </Link>
    {authorId === currentUser?.id && <Button variant='outline' onClick={handleDeletePost}><Trash /></Button> }
    </CardHeader>
    <CardContent className="flex flex-col gap-3">

      {content && (<div>{content}</div>)}
      {images && images.length > 0 && ( 
         <div className="grid gap-2">
        {images.map((i, index) => (
        <img className="w-full h-auto object-contain rounded-lg" key={index} src={`${BASE_URL}${i}`}/>
      ))}
      </div>
      )}
      </CardContent>
    <CardFooter>
        <span className="flex gap-1 text-base mr-2 ">{likes < 1 ? '': likes} <Heart className="cursor-pointer" onClick={handleLike} fill={likedByUser? 'red':'opacity'} /></span>
        <Link to={`/posts/${id}`}>
        <span className="flex gap-1 text-base">{comments< 1 ? '': comments} <MessageCircle /></span>
        </Link>
    </CardFooter>
  </Card>
}

export default Post
