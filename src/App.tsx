import { en, faker, Faker } from "@faker-js/faker";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DataTable } from "./components/shared/DataTable";
import { useTableContext } from "./context";
import { Book } from "./lib/types";
import TableControls from "./components/shared/TableControls";

function App() {
	const { seed, books, setBooks, language, likes, reviews } = useTableContext();

	useEffect(() => {
		fetchInitialBooks();
	}, [seed, language, likes, reviews]);

	const fetchInitialBooks = () => {
		const initialBooks = fetchBooks(0, 20);
		setBooks(initialBooks);
	};

	const fetchMoreBooks = () => {
		const moreBooks = fetchBooks(books.length, 10);
		setBooks(prev => [...prev!, ...moreBooks]);
	};

	const fetchBooks = (lastIdx: number, count: number) => {
		faker.seed(seed);
		const newFaker = new Faker({ locale: [language, en], seed });

		const books: Book[] = newFaker.helpers.multiple(
			(_, idx): Book => {
				const likesFloor = Math.floor(likes[0]);
				const likesProb = likes[0] - likesFloor;

				const likeCount =
					Math.random() < likesProb ? likesFloor + 1 : likesFloor;

				const reviewsFloor = Math.floor(reviews);
				const reviewsProb = reviews - reviewsFloor;

				const reviewCount =
					Math.random() < reviewsProb ? reviewsFloor + 1 : reviewsFloor;

				return {
					id: (lastIdx + idx + 1).toString(),
					isbn: faker.commerce.isbn(),
					title: newFaker.book.title(),
					author: newFaker.person.fullName(),
					publisher: `${newFaker.company.name()},  ${newFaker.date
						.past({ years: 10 })
						.getFullYear()}`,
					image: faker.image.url({ height: 180, width: 120 }),
					likes: likeCount,
					reviews: newFaker.helpers.multiple(
						() => {
							return {
								text: newFaker.lorem.sentence(),
								author: newFaker.person.fullName(),
							};
						},
						{
							count: reviewCount,
						}
					),
				};
			},
			{ count }
		);

		return books;
	};

	const columns: ColumnDef<Book>[] = [
		{
			accessorKey: "id",
			header: "#",
		},
		{
			accessorKey: "isbn",
			header: "ISBN",
		},
		{
			accessorKey: "title",
			header: "Title",
		},
		{
			accessorKey: "author",
			header: "Author(s)",
		},
		{
			accessorKey: "publisher",
			header: "Publisher",
		},
	];

	if (!books) <p className='pt-4 text-center'>Loading...</p>;

	return (
		<main>
			<div className='py-8'>
				<p className='text-4xl font-semibold text-center'>
					Welcome to this Books Page
				</p>
			</div>
			<TableControls />
			<div className='p-8'>
				<InfiniteScroll
					dataLength={books.length}
					next={fetchMoreBooks}
					hasMore={true}
					loader={<p className='pt-4 text-center'>Loading...</p>}>
					<DataTable data={books} columns={columns} />
				</InfiniteScroll>
			</div>
		</main>
	);
}

export default App;
