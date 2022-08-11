import { useState } from 'react';
import { Box, Flex, Tag, Text, useColorModeValue } from '@chakra-ui/react';

const CATEGORIES = ['개발뉴스', '프론트엔드', '잡담', '뻘글', '자기계발'];

// TODO: API 작업 후 카테고리 클릭 시 서브 카테고리 렌더링 작업

export const PostCategories = () => {
	const tagBgColor = useColorModeValue('#f7f7f7', 'gray.600');
	const selectedBgColor = useColorModeValue('gray.600', '#f7f7f7');
	const selectedColor = useColorModeValue('white', 'black');

	const [selectedCategory, setSelectedCategory] = useState('');

	const getIsSelected = (category: string) => {
		return selectedCategory === category;
	};

	const handleClickCurried = (category: string) => () => {
		console.log(category);
		setSelectedCategory(category);
	};

	return (
		<Box my='10'>
			<Flex flexWrap={'wrap'} gap='4'>
				{CATEGORIES.map((category) => (
					<Tag
						as='button'
						key={category}
						position='relative'
						role='group'
						color={getIsSelected(category) ? selectedColor : undefined}
						backgroundColor={
							getIsSelected(category) ? selectedBgColor : tagBgColor
						}
						transition='backgroundColor .5s'
						px={7}
						py={3}
						boxShadow='base'
						fontWeight={500}
						borderRadius={28}
						cursor='pointer'
						onClick={handleClickCurried(category)}
					>
						<Box
							position='absolute'
							w='full'
							h='full'
							left={0}
							top={0}
							transform={
								getIsSelected(category) ? 'scaleX(1.1) scaleY(1.2)' : undefined
							}
							border={`2.5px solid`}
							borderColor={getIsSelected(category) ? 'blue.400' : 'transparent'}
							borderRadius={28}
							_groupHover={{
								borderColor: 'blue.400',
								transform: `scaleX(1.1) scaleY(1.2)`,
								transition: 'scale .5s',
							}}
						/>
						<Text>{category}</Text>
					</Tag>
				))}
			</Flex>
		</Box>
	);
};
