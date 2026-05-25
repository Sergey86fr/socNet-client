import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"



const BackButton = () => {
    const navigate = useNavigate()

    const handleToBack = () => {
     // eslint-disable-next-line @typescript-eslint/no-floating-promises
     navigate(-1)
  }

  return (
    <Button variant='outline' onClick={handleToBack}><ArrowLeft /></Button>
  )
}

export default BackButton