import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FaRandom } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { de, en, faker, ja } from "@faker-js/faker";
import { useTableContext } from "@/context";
import { Label } from "../ui/label";

const TableControls = () => {
	const { seed, setSeed, setLanguage, likes, setLikes, reviews, setReviews } =
		useTableContext();

	const handleLanguage = (newLanguage: string) => {
		if (newLanguage === "English") {
			setLanguage(en);
		} else if (newLanguage === "German") {
			setLanguage(de);
		} else {
			setLanguage(ja);
		}
	};

	const handleRandomizeSeed = () => {
		const randomNumber = faker.number.int({ max: 999_999 });
		setSeed(randomNumber);
	};

	const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const userSeed = parseInt(e.target.value);
		if (!isNaN(userSeed)) setSeed(userSeed);
	};

	const handleLikes = (likes: number[]) => {
		setLikes(likes);
	};

	const handleReviews = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reviews = parseInt(e.target.value);
		if (!isNaN(reviews)) setReviews(reviews);
	};

	return (
		<div className='grid grid-cols-2 md:grid-cols-4 gap-2 my-2 px-8 sticky top-0 bg-white z-10 pb-4'>
			<div>
				<Label className='text-xs text-gray-600'>Languages:</Label>
				<Select onValueChange={handleLanguage}>
					<SelectTrigger>
						<SelectValue placeholder={"English"} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={"English"}>English</SelectItem>
						<SelectItem value={"German"}>German</SelectItem>
						<SelectItem value={"Japanese"}>Japanese</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<Label className='text-xs text-gray-600'>Seed:</Label>
				<div className='flex'>
					<Input value={seed} onChange={handleUserInput} />
					<Button onClick={handleRandomizeSeed} className='mx-1'>
						<FaRandom />
					</Button>
				</div>
			</div>
			<div>
				<Label className='text-xs text-gray-600'>Likes:</Label>
				<div className='px-2'>
					<p className='text-center pb-1'>{likes}</p>
					<Slider
						defaultValue={[0]}
						step={0.1}
						max={5}
						onValueChange={handleLikes}
						value={likes}
					/>
				</div>
			</div>
			<div>
				<Label className='text-xs text-gray-600'>Reviews:</Label>
				<Input value={reviews} onChange={handleReviews} />
			</div>
		</div>
	);
};

export default TableControls;
