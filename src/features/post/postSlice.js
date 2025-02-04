import { createSlice, nanoid , createAsyncThunk} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from 'axios'

const POST_URL ='https://jsonplaceholder.typicode.com/posts'


const initialState = {
  posts:[],
  status: 'idle', //idle|'loading'|'succeeded'|'failed'
  error:null
};

export const fetchPosts = createAsyncThunk('post/fetchPost',async()=>
  {
  const responce = await axios.get(POST_URL)
  return responce.data
})

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
          },
        };
      },
    },
    reactionAdded(state, action){
        const {postId , reaction} = action.payload
        const existingPost = state.posts.find(post => post.id === postId)
        if(existingPost){
          existingPost.reactions[reaction]++
        }
    }
  },
  extraReducers(builder){
    builder
         .addCase(fetchPosts.pending,(state,action)=>{ state.status = 'loading'})
         .addCase(fetchPosts.fulfilled,(state,action)=>{
           state.status = 'succeeded'
           //Adding date and reacttions
           let min =1;
           const loadedPosts = action.payload.map(post =>{
            post.date = sub(new Date(),{minutes:min++}).toISOString();
            post.reactions = {
              thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0
            }
            return post;
           });
           //add any fetched posts to the array
           state.posts = state.posts.concat(loadedPosts)

         })
         .addCase(fetchPosts.rejected,(state,action)=>{ state.status ='failed', state.error =action.error.message})

  }
});

export const selectAllPost = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state)=> state.posts.error;
export const { postAdded ,reactionAdded} = postSlice.actions;
export default postSlice.reducer;
