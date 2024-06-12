import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { postAdded } from './postSlice'
import { selectAlluser } from '../user/userSlice'

const AddPostForm = () => {
    
    const dispatch = useDispatch()
    const [title,setTitle]=useState('')
    const [content,setContent] = useState('')
    const [userId,setUserId] = useState('')
    const user = useSelector(selectAlluser)

    const onSavePostClicked = () =>{
        if(title && content){
            dispatch(
                postAdded(title,content,userId),
                setTitle(''),
                setContent('')
            )
        }
    }
    const useroption = user.map( user => <option key={user.id} value={user.id}>{user.name}</option>)

    const onTitlechanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const otherChange = e => setUserId(e.target.value)
    const canSave = Boolean(title)&&Boolean(content)&&Boolean(userId)

  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor='postTitle'>Post Title :</label>
            <input type='text' id="postTitle" name='postTitle' value={title} onChange={onTitlechanged}/>
            
            <label>User:</label>
            <select id='postAuthor' value={userId} onChange={otherChange}>
                <option value=''></option>
                {useroption}
            </select>

            <label htmlFor='PostContent'>PostContent :</label>
            <textarea id="PostContent" name='PostContent' value={content} onChange={onContentChanged} required/>
            <button disabled={!canSave} type='button' onClick={onSavePostClicked}>Save post</button>
        </form>
        
    </section>
  )
}

export default AddPostForm