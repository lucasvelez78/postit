"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type CommentProps = {
  id?: string;
};

type Comment = {
  postId?: string;
  message: string;
};

export default function AddComment({ id }: CommentProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: Comment) =>
      await axios.post("/api/posts/addComment", { data }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.success("Comment has been posted 💥");
        queryClient.invalidateQueries(["detail-post"]); //queryKey in page.tsx - slug -
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitComment = (evt: React.FormEvent) => {
    evt.preventDefault();
    toast.loading("Uploading comment...");
    setIsDisabled(true);
    mutate({ message: title, postId: id });
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          type="text"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex justify-between gap-2 items-center">
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-md disabled:opacity-25"
          type="submit"
        >
          add comment
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
