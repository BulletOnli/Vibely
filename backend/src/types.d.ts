type Id = number | 'me';

interface Like {
	key: string;
	isLiked: boolean | null;
	postId: string;
	userId: string;
}

interface HttpError {
	status: number;
	message: string;
}
