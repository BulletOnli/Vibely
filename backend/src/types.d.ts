type Id = number | 'me';

interface User {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	birthday?: string;
	gender: 'male' | 'female';
}

interface Like {
	key: string;
	isLiked: boolean | null;
	postId: number;
	userId: string;
}

interface Comment {
	text: string;
	likes: number;
}
