import { create } from 'zustand';

interface Post {
  postId: string;
  title: string;
  content: string;
}

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updatedPost: Partial<Post>) => void;
  deletePost: (postId: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (postId, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.postId === postId ? { ...post, ...updatedPost } : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.postId !== postId),
    })),
}));
