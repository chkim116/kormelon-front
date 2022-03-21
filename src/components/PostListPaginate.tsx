import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface PostListPaginateProps {
	total: number;
	per: number;
}

const PostListPaginate = ({ total, per }: PostListPaginateProps) => {
	const { push, query, pathname } = useRouter();

	const [selectedPage, setSelectedPage] = useState(Number(query?.page) || 1);

	const pages = useMemo(() => {
		const length = Math.ceil(total / per);
		const start = per * (Math.ceil(selectedPage / per) - 1);
		const end = per * Math.ceil(selectedPage / per);

		return Array.from({ length })
			.map((_, i) => i + 1)
			.slice(start, end);
	}, [total, per, selectedPage]);

	const onClickPagination = useCallback((e) => {
		const { page } = e.currentTarget.dataset;

		setSelectedPage(Number(page));
	}, []);

	const onClickNext = useCallback(() => {
		setSelectedPage((prev) => (prev + 1 > pages.length ? prev : prev + 1));
	}, [pages.length]);

	const onClickPrev = useCallback(() => {
		setSelectedPage((prev) => (prev - 1 > 0 ? prev - 1 : prev));
	}, []);

	useEffect(() => {
		push(`${pathname}?page=${selectedPage}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPage]);

	return (
		<PostListPaginateStyle>
			<li onClick={onClickPrev}>{'<'}</li>
			{pages.map((page) => (
				<PaginateBtn
					onClick={onClickPagination}
					selected={selectedPage === page}
					data-page={page}
					key={page}
				>
					{page}
				</PaginateBtn>
			))}
			<li onClick={onClickNext}>{'>'}</li>
		</PostListPaginateStyle>
	);
};

export default PostListPaginate;

const PostListPaginateStyle = styled.div`
	width: 100%;
	display: flex;
	justify-content: right;
	gap: 6px;

	li {
		list-style: none;
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.onPrimary};
		border: 1px solid ${({ theme }) => theme.colors.border};
		font-size: ${({ theme }) => theme.fontSizes.sm};
		width: 30px;
		height: 30px;
		text-align: center;
		cursor: pointer;
	}
`;

const PaginateBtn = styled.li<{ selected?: boolean }>`
	${({ selected, theme }) => {
		if (selected) {
			return css`
				font-weight: bold;
				background-color: ${theme.colors.onSecondary} !important;
				color: ${theme.colors.secondary} !important;
			`;
		}
	}};
`;
