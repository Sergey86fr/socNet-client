import { useAppSelector } from "@/app/hooks"
import { Card, CardContent} from "@/components/ui/card"
import { BASE_URL } from "@/constants"
import { selectCurent } from "@/features/user/userSlice"
import { Link } from "react-router-dom"



const Followers = () => {

   const current = useAppSelector(selectCurent);
    if (!current) {
    return null
  }
  
   if(current.followers.length === 0) return <div>У вас пока нет подписчиков!</div>
  return (
  <>
    <div className="flex flex-col gap-5">
      {
        current.followers.map((f) =>(
        <Link to={`/users/${f.follower.id}`} key={f.follower.id}>
          <Card  >
            <CardContent className="flex flex-row gap-2">
              <img  className="h-15" src={`${BASE_URL}${f.follower.avatarUrl ?? ''}`}/>
              <div className="flex flex-col justify-between p-1">
              <p>{f.follower.name}</p>
              <p>{f.follower.email}</p>
              </div>
            </CardContent>
          </Card>
          </Link>
        ))
      }
    </div>
  </>
  )
}

export default Followers