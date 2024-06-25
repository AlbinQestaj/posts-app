import { Box } from '@chakra-ui/react';
import PostForm from '../components/PostForm';

const CreatePostPage: React.FC = () => {
  return (
    <Box p={4}>
      <PostForm />
    </Box>
  );
};

export default CreatePostPage;
