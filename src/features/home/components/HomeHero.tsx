import {
	Flex,
	Heading,
	keyframes,
	SimpleGrid,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import { Section } from '@common/components/Section';
import { Image } from '@common/components/Image';
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
		<Section>
			<SimpleGrid px={5} columns={{ base: 1, lg: 2 }} spacing={10}>
				<Stack spacing={4} animation={textAnimation} py={{ base: 0, md: 8 }}>
					<Heading>Kormelon</Heading>
					<Text color={'gray.500'}>KimChanghoe, Web Developer</Text>
				</Stack>
				<Flex w='full' h='full' display='block' animation={imageAnimation}>
					<Image
						width='514px'
						height='419px'
						layout='responsive'
						src={imageSrc}
						alt='blog home main image - stars'
					/>
				</Flex>
			</SimpleGrid>
		</Section>
	);
};
