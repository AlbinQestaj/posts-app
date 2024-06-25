import { Box } from '@chakra-ui/react';
import PostList from '../components/PostList';

const HomePage: React.FC = () => {
  return (
    <Box
      width={'100vw'}
      height={'75vh'}
      alignContent={'center'}
      justifyContent={'center'}
    >
      <PostList />
    </Box>
  );
};

export default HomePage;
