import { useAppSelector } from "@/app/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { BASE_URL } from "@/constants";
import { selectCurent } from "@/features/user/userSlice";
import { Link } from "react-router-dom";


const Following = () => {
   const current = useAppSelector(selectCurent);
    if (!current) {
    return null
  }
  
   if(current.following.length === 0) return <div>Вы пока ни на кого не подписаны!</div>
  return (
    <>
    <div className="flex flex-col gap-5">
      {
        current.following.map((f) =>(
        <Link to={`/users/${f.following.id}`} key={f.following.id}>
          <Card  >
            <CardContent className="flex flex-row gap-2">
              <img  className="h-15" src={`${BASE_URL}${f.following.avatarUrl ?? ''}`}/>
              <div className="flex flex-col justify-between p-1">
              <p>{f.following.name}</p>
              <p>{f.following.email}</p>
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

export default Following