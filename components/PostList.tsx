import {
  Box,
  Button,
  VStack,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  HStack,
  Skeleton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { usePostStore } from '../stores/postStore';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import {
  EditIcon,
  DeleteIcon,
  ChevronDownIcon,
  AddIcon,
} from '@chakra-ui/icons';
import Pagination from './Pagination';

interface Post {
  postId: string;
  title: string;
  content: string;
}

const PostList: React.FC = () => {
  const { posts, setPosts, deletePost } = usePostStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const SkeletonPosts: Number[] = Array.from({ length: 5 }, (_, i) => i);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/posts', {
        params: {
          page: currentPage,
          limit: 5,
        },
      });
      if (response) {
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        console.log('ERROR: ', err.message);
      } else {
        console.log('ERROR: ', err);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const handleDelete = async (postId: string) => {
    await axiosInstance.delete(`/posts/${postId}`);
    deletePost(postId);
  };

  return (
    <Box>
      <VStack spacing={4} align="center">
        <Card w="50%" p='20px'>
          <CardHeader>
            <Heading size="md">Posts</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="2">
              {isLoading
                ? SkeletonPosts.map((_, index) => (
                    <Box key={index}>
                      <Skeleton height="37px" fadeDuration={1} mt={2} />
                    </Box>
                  ))
                : posts.map((post) => (
                    <Box key={post.postId}>
                      <HStack justifyContent="space-between">
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            {post.title}
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {post.content}
                          </Text>
                        </Box>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<ChevronDownIcon />}
                            variant="outline"
                          />
                          <MenuList>
                            <MenuItem
                              icon={<EditIcon />}
                              onClick={() =>
                                router.push(`/edit?postId=${post.postId}`)
                              }
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              icon={<DeleteIcon />}
                              onClick={() => handleDelete(post.postId)}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </HStack>
                    </Box>
                  ))}

              <Flex>
                <Box>
                  <Heading size="xs" textTransform="uppercase" textColor={'GrayText'}>
                    Lorem ipsum
                  </Heading>
                  <Text pt="2" fontSize="sm" textColor={'GrayText'}>
                    Lorem ipsum dolor sit ammet
                  </Text>
                </Box>
                <Spacer />
                <Heading
                  size="xs"
                  textAlign={'end'}
                  textTransform="uppercase"
                  textColor={'GrayText'}
                >
                  <Button>
                    Add
                    <AddIcon marginLeft={'10px'}/>
                  </Button>
                </Heading>
              </Flex>
            </Stack>
          </CardBody>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Card>
      </VStack>
    </Box>
  );
};

export default PostList;
