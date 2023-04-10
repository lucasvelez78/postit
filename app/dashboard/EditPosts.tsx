"use client";

import Image from "next/image";
import { useState } from "react";
import Toggle from "../components/Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    userId: string;
    postId: string;
  }[];
};

export default function EditPosts({
  avatar,
  id,
  name,
  title,
  comments,
}: EditProps) {
  // toggle: are you sure you want to delete this post?
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();

  //delete post
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
    {
      onError: (error) => {
        toast.error("Error deleting the post.");
      },
      onSuccess: (data) => {
        toast.success("Post deleted.");
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = () => {
    toast.loading("Deleting your post.");
    mutate(id);
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex gap-2 items-center">
          <Image width={32} height={32} src={avatar} alt="avatar" />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="my-8 flex gap-6">
          <p className="font-bold text-gray-700 text-sm">
            {comments?.length} Comments
          </p>
          <button
            className="text-sm font-bold text-red-500"
            onClick={() => setToggle(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
}
