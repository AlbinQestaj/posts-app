import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { usePostStore } from '../stores/postStore';

const PostDetail: React.FC = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { posts } = usePostStore();
  const post = posts.find((p) => p.postId === postId);

  if (!post) return <Text>Post not found</Text>;

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">
        {post.title}
      </Text>
      <Text mt={2}>{post.content}</Text>
      <Button onClick={() => router.push('/')}>Back</Button>
    </Box>
  );
};

export default PostDetail;
