import React from 'react'
import Editor from '../component/Editor'

const CreatePage = () => {
  return (
    <form>
      <input type="text" name="title" placeholder='Title' />
      <input type="text" name="summary" placeholder='summary' />
      <input type="file" name="file" id='file' />
      <Editor />
      <button>Create Post</button>
    </form>
  )
}

export default CreatePage