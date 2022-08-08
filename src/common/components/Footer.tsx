import {
	Box,
	Center,
	Flex,
	Icon,
	Link,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai';

export const Footer = () => {
	return (
		<Box
			py={24}
			fontSize='18px'
			fontWeight={'500'}
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Flex justifyContent={'center'} direction='column' alignItems={'center'}>
				<Text>© 2022 Kim Changhoe. All rights reserved</Text>

				<Flex mt={4}>
					<Link href='mailto:cskim132@gmail.com'>
						<Flex alignItems={'center'} gap='2' mr='4'>
							<Icon as={AiOutlineMail} />
							<Text>Email</Text>
						</Flex>
					</Link>
					<Link href='https://github.com/chkim116' target='_blank'>
						<Flex alignItems={'center'} gap='2'>
							<Icon as={AiFillGithub} />
							<Text>Github</Text>
						</Flex>
					</Link>
				</Flex>
			</Flex>
		</Box>
	);
};
