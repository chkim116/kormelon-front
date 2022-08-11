import {
	PostCategoryEntity,
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

export function createPostDetail(): PostDetailEntity {
	return {
		userId: '',
		content: '',
		comments: [],
		id: '',
		title: '',
		category: createPostCategory(),
		view: 0,
		tags: [],
		readTime: 0,
		isPrivate: false,
		createdAt: '',
	};
}
