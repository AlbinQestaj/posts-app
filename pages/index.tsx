import { Box, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';
import PostList from '../components/PostList';

const HomePage: React.FC = () => {
  return (
    <Box p={4}>
      <Heading mb={4}>Posts</Heading>
      <Link href="/create">
        <Button mb={4}>Create Post</Button>
      </Link>
      <PostList />
    </Box>
  );
};

export default HomePage;
