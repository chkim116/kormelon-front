import { chakra } from '@chakra-ui/react';
import NextImage from 'next/image';

export const Image = chakra(NextImage, {
	shouldForwardProp: (prop) =>
		[
			'width',
			'height',
			'layout',
			'quality',
			'src',
			'alt',
			'objectFit',
		].includes(prop),
});
