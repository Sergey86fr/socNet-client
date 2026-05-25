/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useAppSelector } from "@/app/hooks"
import { selectCurent } from "@/features/user/userSlice"
import { Card, CardContent, CardHeader } from "../ui/card"
import { BASE_URL } from "@/constants"
import { Link } from "react-router-dom"

const Profile = () => {
  const current = useAppSelector(selectCurent)

  if (!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  return (
    <Card className="w-60 max-w-sm mx-auto md:max-w-none mb-3">
        <Link to={`users/${id}`}>
      <CardHeader>
        <img className="object-cover rounded-xl" alt="Card profile" src={`${BASE_URL}${avatarUrl}`} />
      </CardHeader>
      <CardContent>
        <h4>{name}</h4>
        <p>
            {email}
        </p>
      </CardContent>
        </Link>
    </Card>
  )
}

export default Profile
