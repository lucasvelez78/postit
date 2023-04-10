"use client";

import Post from "@/app/components/Post";
import AddComment from "@/app/components/AddComment";
import { CompletePostType } from "@/app/types/Post";
import { Comments } from "@/app/types/Comment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function DetailPost(url: URL) {
  const { data, isLoading } = useQuery<CompletePostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });

  if (isLoading) return "Loading...";

  return (
    <div>
      <Post
        id={data?.id as string}
        name={data?.user.name as string}
        avatar={data?.user.image as string}
        postTitle={data?.title as string}
        comments={data?.comments as Comments}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment.user.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="p-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
