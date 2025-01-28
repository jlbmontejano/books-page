import { Book } from "@/lib/types";
import { en, faker, LocaleDefinition } from "@faker-js/faker";
import { createContext, ReactNode, useContext, useState } from "react";

type TableContextType = {
	seed: number;
	setSeed: React.Dispatch<React.SetStateAction<number>>;
	books: Book[];
	setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
	language: LocaleDefinition;
	setLanguage: React.Dispatch<React.SetStateAction<LocaleDefinition>>;
	likes: number[];
	setLikes: React.Dispatch<React.SetStateAction<number[]>>;
	reviews: number;
	setReviews: React.Dispatch<React.SetStateAction<number>>;
};

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
	const randomNumber = faker.number.int({ max: 999_999 });
	const [seed, setSeed] = useState<number>(randomNumber);
	const [books, setBooks] = useState<Book[]>([]);
	const [language, setLanguage] = useState<LocaleDefinition>(en);
	const [likes, setLikes] = useState<number[]>([0]);
	const [reviews, setReviews] = useState<number>(0);

	const value = {
		seed,
		setSeed,
		books,
		setBooks,
		language,
		setLanguage,
		likes,
		setLikes,
		reviews,
		setReviews,
	};

	return (
		<TableContext.Provider value={value}>{children}</TableContext.Provider>
	);
};

export const useTableContext = () => {
	const context = useContext(TableContext);
	if (!context) {
		throw new Error("useTableContext must be used within an TableProvider");
	}
	return context;
};
