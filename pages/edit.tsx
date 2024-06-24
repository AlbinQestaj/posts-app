import { useRouter } from 'next/router';
import { Box, Heading } from '@chakra-ui/react';
import PostForm from '../components/PostForm';
import { usePostStore } from '../stores/postStore';

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { posts } = usePostStore();
  const post = posts.find((p) => p.postId === postId);

  if (!post) return <Heading>Post not found</Heading>;

  return (
    <Box p={4}>
      <Heading mb={4}>Edit Post</Heading>
      <PostForm post={post} />
    </Box>
  );
};

export default EditPostPage;
