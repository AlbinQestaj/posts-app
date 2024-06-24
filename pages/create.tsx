import { Box, Heading } from '@chakra-ui/react';
import PostForm from '../components/PostForm';

const CreatePostPage: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Create Post</Heading>
      <PostForm />
    </Box>
  );
};

export default CreatePostPage;
