import { useCurrentQuery } from "@/app/services/userApi"
import { Spinner } from "@/components/ui/spinner"
import type { JSX } from "react"

type IAuthGuard = {
  children: JSX.Element
}

const AuthGuard = ({ children }: IAuthGuard) => {
  const { isLoading} = useCurrentQuery()
  if (isLoading) {
    return <Spinner />
  }

  return children
}

export default AuthGuard
