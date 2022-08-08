import { ChatIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Avatar,
	Badge,
	Button,
	Center,
	Flex,
	keyframes,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	useBoolean,
	useColorMode,
} from '@chakra-ui/react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// TODO: 차후 수정
const AVATAR_IMAGE = 'https://avatars.dicebear.com/api/male/username.svg';

export const UserMenu = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [flag, setFlag] = useBoolean();

	const animation = flag ? `${spin} .2s linear` : undefined;

	const handleToggleColorMode = () => {
		toggleColorMode();

		setFlag.on();

		new Promise((resolve) => setTimeout(resolve, 200)).then(() =>
			setFlag.off()
		);
	};

	return (
		<Flex alignItems={'center'}>
			<Stack direction={'row'} spacing={2}>
				<Menu>
					<MenuButton
						as={Button}
						bg={'transparent'}
						rounded='full'
						width='24px'
						px={0}
					>
						<ChatIcon fontSize={18} />
						<Badge
							position={'absolute'}
							top={0}
							right={0}
							rounded='full'
							px={1}
							color='white'
							bg='red.300'
						>
							1
						</Badge>
					</MenuButton>

					{/* TODO: 알림 */}
					<MenuList cursor='pointer'>
						<MenuItem>알림 리스트</MenuItem>
						<MenuItem>알림 리스트2</MenuItem>
						<MenuItem>알림 리스트3</MenuItem>
					</MenuList>
				</Menu>
				<Button
					onClick={handleToggleColorMode}
					rounded='full'
					bg={'transparent'}
					animation={animation}
					width='24px'
				>
					{colorMode === 'light' ? (
						<MoonIcon color='yellow.400' fontSize={24} />
					) : (
						<SunIcon color='yellow.100' fontSize={24} />
					)}
				</Button>
				<Menu>
					<MenuButton
						as={Button}
						rounded={'full'}
						variant={'link'}
						cursor={'pointer'}
						minW={0}
					>
						<Avatar size={'sm'} src={AVATAR_IMAGE} />
					</MenuButton>
					<MenuList alignItems='center'>
						<Center pt={4}>
							<Avatar size={'2xl'} src={AVATAR_IMAGE} />
						</Center>
						<Center py={6}>
							<p>Username</p>
						</Center>
						<MenuDivider />
						<MenuItem>Logout</MenuItem>
					</MenuList>
				</Menu>
			</Stack>
		</Flex>
	);
};
