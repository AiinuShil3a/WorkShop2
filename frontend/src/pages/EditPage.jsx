import React, { useState, useEffect } from 'react';
import Editor from '../component/Editor';
const baseURL = import.meta.env.VITE_BASE_URL
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${baseURL}/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchPost();
  }, [id]);

  const updatePost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.append("file", file[0]);  // ใช้ append แทน set

    e.preventDefault();

    const res = await fetch(`${baseURL}/posts/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => setFile(e.target.files)}
      />
      <Editor
        value={content}
        onChange={setContent}
      />
      <button>Create Post</button>
    </form>
  );
};

export default EditPage;
