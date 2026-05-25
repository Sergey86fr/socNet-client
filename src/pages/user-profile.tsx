/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useAppSelector } from "@/app/hooks"
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/app/services/followsApi"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "@/app/services/userApi"
import BackButton from "@/components/backButton/backButton"
import EditProfileModal from "@/components/editProfileModal/editProfileModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BASE_URL } from "@/constants"
import { resetUser, selectCurent } from "@/features/user/userSlice"
import { formatToClientDate } from "@/utils/format-to-client-date"
import { useEffect, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const currentUser = useAppSelector(selectCurent)
  const dispatch = useDispatch()
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()



  const [isModalOpen, setIsModalOpen] = useState(false)
  // useEffect(() => {
  //   return () =>  {
  //     dispatch(resetUser())
  //   }
  // }, [dispatch])

   useEffect(() => () => {
     dispatch(resetUser())
   }, [dispatch])

  const handleFollow = async () => {
    if (!id) return
    try {
      data?.isFollowing === true
        ? await unfollowUser(id).unwrap()
        : await followUser({ followingId: id }).unwrap()
      await triggerGetUserByIdQuery(id)
      await triggerCurrentQuery()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = async () => {
    if(!id) return;
     try {
      await triggerGetUserByIdQuery(id);
      await triggerCurrentQuery().unwrap()
      setIsModalOpen(false)
     } catch (error) {
      console.log(error);
      toast.error("Не удалось обновить данные");
     }
  }

  if (!data) {
    return null
  }

  return (
    <div className="flex gap-4">
      <BackButton/>
      <Card className="flex-1">
        <CardHeader>
          
          <img src={`${BASE_URL}${data.avatarUrl}`} />
        </CardHeader>
        <CardContent>
          <p className="mb-5">{data.name}</p>

          {currentUser?.id === id ? (
            <Button variant='outline' onClick={() => { setIsModalOpen(true); }}>Редактировать</Button>
          ) : (
            <Button variant='outline' onClick={handleFollow}>
              {data.isFollowing ? "Отписаться" : "Подписаться"}
            </Button>
          )}
        </CardContent>
      </Card>
      <Card className="flex-2">
        <CardHeader>
         {data.email && <p>Почта: {data.email}</p>}
          {data.bio && <p>Обо мне: {data.bio}</p>}
          {data.dateOfBirth && <p>Дата рождения: {formatToClientDate(data.dateOfBirth)}</p>}
          {data.location && <p>Местоположение: {data.location}</p>}
        </CardHeader>
        <CardContent>
          <p>Подписчики: {data.followers.length}</p>
          <p>Подписки: {data.following.length}</p>
        </CardContent>
      </Card>
        <EditProfileModal isOpen={isModalOpen} onClose={handleClose} id={id} user={data}/>
    </div>
  )
}

export default UserProfile
