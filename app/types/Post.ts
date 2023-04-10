export type PostType = {
  id: string;
  title: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    message: string;
  }[];
};

export type CompletePostType = {
  id: string;
  title: string;
  updatedAt?: string;
  user: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
  comments: {
    createdAt?: string;
    id: string;
    message: string;
    postId: string;
    title: string;
    userId: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  }[];
};

export type PostProps = {
  avatar: string;
  name: string;
  postTitle: string;
  id: string;
  comments: {
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
};
