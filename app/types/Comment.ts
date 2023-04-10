export type Comments = {
  id: string;
  createdAt: string;
  message: string;
  postId: string;
  userId: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
}[];
