import { useState } from 'react';
import { Box, Button, Input, Textarea, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { usePostStore } from '../stores/postStore';
import axiosInstance from '../utils/axiosInstance';

interface PostFormProps {
  post?: {
    postId: string;
    title: string;
    content: string;
  };
}

const PostForm: React.FC<PostFormProps> = ({ post }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const router = useRouter();
  const { addPost, updatePost } = usePostStore();

  const handleSubmit = async () => {
    if (post) {
      await axiosInstance.put(`/posts/${post.postId}`, { title, content });
      updatePost(post.postId, { title, content });
    } else {
      const newPost = { postId: Date.now().toString(), title, content };
      await axiosInstance.post('/posts', newPost);
      addPost(newPost);
    }
    router.push('/');
  };

  return (
    <Box>
      <VStack spacing={4} align="flex-start">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </VStack>
    </Box>
  );
};

export default PostForm;
