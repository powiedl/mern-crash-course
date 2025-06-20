import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true,
      });
    }
  };
  const handleUpdate = async (id, prod) => {
    const { success, message } = await updateProduct(id, prod);
    onClose();
    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        isClosable: true,
      });
    }
  };
  return (
    <Box
      shadow='lg'
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w='full'
        objectFit={'cover'}
      />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            aria-label='edit product'
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme='blue'
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDelete(product._id)}
            colorScheme='red'
            aria-label='delete product'
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder='Product Price'
                name='price'
                type='number'
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder='Product Image'
                name='image'
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => handleUpdate(updatedProduct._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ProductCard;
