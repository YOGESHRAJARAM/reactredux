import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postSlice.js'


const reactionsEmoji ={
    thumbsUp:"👍",
    wow:'😃',
    heart:'🧡',
    rocket:'🚀',
    coffee:'☕',

}

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch()
   

    const reactionButtons = Object.entries(reactionsEmoji).map(([name,emoji])=>{
        return(
            <button onClick={()=>dispatch(reactionAdded({postId: post.id,reaction:name}))} key={name} type='button' className='reactionButton'><span>{emoji}</span>{post.reactions[name]}</button>
        )
    })
  return (
    <div>{reactionButtons}
      
    </div>
  )
}

export default ReactionButtons