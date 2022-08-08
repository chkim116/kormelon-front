import { ChatIcon } from '@chakra-ui/icons';
import {
	Menu,
	MenuButton,
	Button,
	Badge,
	MenuList,
	MenuItem,
} from '@chakra-ui/react';

export const NoticeMenu = () => {
	return (
		<Menu>
			<MenuButton as={Button}>
				<ChatIcon />
				<Badge position={'absolute'} top={0} right={0} borderRadius={50} px={1}>
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
	);
};
