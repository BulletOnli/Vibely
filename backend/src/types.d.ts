/*interface UserRegistrationDetails {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	confirmPassword: string;
	birthday?: Date;
	gender: "male" | "female";
}

interface UserLoginDetails {
	username: string;
	password: string;
}
*/

type Id = number | "me";

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
	isLiked: boolean;
	isDisliked: boolean;
	postId: number;
	userId: string;
} 
