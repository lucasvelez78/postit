"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthPosts } from "../types/AuthPosts";
import EditPosts from "./EditPosts";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });

  if (isLoading) return <h1>Posts are loading ...</h1>;

  return (
    <div>
      <h1>data</h1>
      {data?.posts.map((post) => (
        <EditPosts
          key={post.id}
          id={post.id}
          name={data.name}
          avatar={data.image}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
