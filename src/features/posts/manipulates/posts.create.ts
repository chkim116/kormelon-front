import {
	PostCategoryEntity,
	PostTagEntity,
	PostDetailEntity,
} from '@core/entities/posts/posts.entity';

export function createPostCategory(): PostCategoryEntity {
	return {
		id: '',
		value: '',
		parentId: '',
		parentValue: '',
	};
}

export function createPostTags(): PostTagEntity {
	return {
		id: '',
		value: '',
		count: 0,
	};
}

export function createPostDetail(): PostDetailEntity {
	return {
		userId: '',
		content: '',
		comments: [],
		id: '',
		title: '',
		category: createPostCategory(),
		view: 0,
		tags: createPostTags(),
		readTime: 0,
		isPrivate: false,
		createdAt: '',
	};
}
