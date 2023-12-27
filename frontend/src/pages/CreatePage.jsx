import {useState} from 'react'
import Editor from '../component/Editor'
const baseURL = import.meta.env.VITE_BASE_URL
import {Navigate} from "react-router-dom"
const CreatePage = () => {
  const [title,setTitle] = useState("")
  const [summary,setSummary] = useState("")
  const [content,setContent] = useState("")
  const [file,setFile] = useState("")
  const [redirect,setRedirect] = useState(false)

  const createPost = async(e) =>{
    const data =new FormData();
    data.set("title",title);
    data.set("summary",summary);
    data.set("content",content);
    data.set("file",file[0]);
    e.preventDefault();
    const res = await fetch(`${baseURL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });
    if(res.ok){
      setRedirect(true)
    }
  }

  return (
    <form onSubmit={createPost}>
      <input type="text" name="title" placeholder='Title' onChange={(e)=> setTitle(e.target.value)} />
      <input type="text" name="summary" placeholder='summary' onChange={(e)=> setSummary(e.target.value)}/>
      <input type="file" name="file" id='file' onChange={(e) => setFile(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button>Create Post</button>
    </form>
  )
}

export default CreatePage