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

interface User {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	birthday?: string;
	gender: 'male' | 'female';
}
