import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Icon,
	IconButton,
	Slide,
	Stack,
	StackDivider,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { AiFillGithub } from 'react-icons/ai';
import { NavLink } from './NavLink';

export const NavLinkMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const IconColor = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');
	const MobileNavColor = useColorModeValue('white', 'gray.900');

	return (
		<>
			<Flex
				display={{ base: 'none', md: 'flex' }}
				flex={2}
				gap='36px'
				fontSize={18}
				fontWeight={500}
			>
				<NavLink to='/posts'>Posts</NavLink>
				<NavLink to='/works'>Works</NavLink>
				<NavLink to='/github'>
					<Flex alignItems={'center'} gap='4px'>
						<Icon as={AiFillGithub} color={IconColor} />
						Github
					</Flex>
				</NavLink>
			</Flex>

			<Flex flex={2} zIndex={2} display={{ md: 'none' }}>
				<IconButton
					size={'md'}
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label={'Open Menu'}
					onClick={isOpen ? onClose : onOpen}
				/>
			</Flex>

			<Slide direction='left' in={isOpen} style={{ zIndex: 1 }}>
				<Box pb={4} h='full' display={{ md: 'none' }}>
					<Flex
						bg={MobileNavColor}
						w='full'
						h='full'
						alignItems='flex-start'
						pt={40}
						pl={8}
					>
						<Stack
							as={'nav'}
							spacing={6}
							fontSize={18}
							divider={<StackDivider borderColor='gray.900' />}
						>
							<NavLink to='/posts'>Posts</NavLink>
							<NavLink to='/works'>Works</NavLink>
							<NavLink to='/github'>
								<Flex alignItems={'center'} gap='4px'>
									<Icon as={AiFillGithub} color={IconColor} />
									Github
								</Flex>
							</NavLink>
						</Stack>
					</Flex>
				</Box>
			</Slide>
		</>
	);
};
