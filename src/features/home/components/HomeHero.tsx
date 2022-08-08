import {
	Container,
	Flex,
	Heading,
	Image,
	keyframes,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import { mainImageDark, mainImageLight } from '@assets/index';

const translateYUp = keyframes`
	from {
		transform: translateY(25px);
		opacity: 0;
	}
	to {
		transform: translateY(0px);
		opacity: 1;
	}
`;

const scaleDown = keyframes`
	from {
		transform: scale(1.5);
		opacity: 0;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
`;

const imageAnimation = `${scaleDown} 0.75s ease-out`;
const textAnimation = `${translateYUp} 0.5s ease-out`;

export const HomeHero = () => {
	const imageSrc = useColorModeValue(mainImageLight, mainImageDark);
	return (
		<Container maxW={'8xl'} py={{ base: 10, md: 24, lg: 36 }}>
			<SimpleGrid px={5} columns={{ base: 1, lg: 2 }} spacing={10}>
				<Stack spacing={4} animation={textAnimation} py={{ base: 0, md: 8 }}>
					<Heading>Kormelon</Heading>
					<Text color={'gray.500'}>KimChanghoe, Web Developer</Text>
				</Stack>
				<Flex animation={imageAnimation}>
					<Image src={imageSrc} alt='blog home main image - stars' />
				</Flex>
			</SimpleGrid>
		</Container>
	);
};
