export type Book = {
	id: string;
	isbn: string;
	title: string;
	author: string;
	publisher: string;
	image: string;
	likes: number;
	reviews: Review[];
};

export type Review = {
	text: string;
	author: string;
};

export type Language = "English" | "German" | "Japanese";
