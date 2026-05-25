import { Link } from "react-router-dom"

const Title = () => {
  return (
    <Link to={"/"}>
      <h4 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        My network
      </h4>
    </Link>
  )
}

export default Title
