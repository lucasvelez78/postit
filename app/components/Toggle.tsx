type ToggleProps = {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
};

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      onClick={() => setToggle(false)}
      className="fixed bg-black/50 w-full h-full top-0 left-0 z-20"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-2xl">Are you sure you want to delete this post?</h2>
        <h3 className="text-red-600 text-sm">
          Pressing the delete buttonn will permanently delete your post
        </h3>
        <button
          onClick={deletePost}
          className="bg-red-600 text-white text-sm py-2 px-4 rounded-md"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}
