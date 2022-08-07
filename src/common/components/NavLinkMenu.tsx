import { ReactNode } from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	Icon,
	IconButton,
	Link,
	Slide,
	Stack,
	StackDivider,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import { AiFillGithub } from 'react-icons/ai';

interface NavLinkProps extends Omit<LinkProps, 'href'> {
	children: ReactNode;
	to: string;
}

const NavLink = ({ children, to, ...props }: NavLinkProps) => {
	const InitialColors = useColorModeValue('blackAlpha.700', 'whiteAlpha.700');
	const hoverColors = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');

	return (
		<NextLink {...props} href={to}>
			<Link
				px={2}
				py={1}
				rounded={'md'}
				color={InitialColors}
				_hover={{
					textDecoration: 'none',
					color: hoverColors,
					transition: 'all .5s ease',
					'& svg': {
						color: hoverColors,
					},
				}}
			>
				{children}
			</Link>
		</NextLink>
	);
};

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
