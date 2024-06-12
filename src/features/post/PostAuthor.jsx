import { selectAlluser } from "../user/userSlice.js"
import { useSelector } from "react-redux"

const PostAuthor = ({userId}) => {

    const users=useSelector(selectAlluser)
    const author =users.find(user => user.id == userId)
  return (
    <span> by {author ? author.name : "unkonow Author"}</span>
  )
}

export default PostAuthor