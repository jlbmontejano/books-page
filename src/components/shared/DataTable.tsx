import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useTableContext } from "@/context";
import { Book } from "@/lib/types";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DataTableProps {
	columns: ColumnDef<Book>[];
	data: Book[];
}

export function DataTable({ columns, data }: DataTableProps) {
	const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
	const { seed, likes, reviews } = useTableContext();

	useEffect(() => {
		setExpandedRows(new Set());
	}, [seed, likes, reviews]);

	const toggleRowExpansion = (rowId: string) => {
		setExpandedRows(prev => {
			const newSet = new Set(prev);
			if (newSet.has(rowId)) {
				newSet.delete(rowId);
			} else {
				newSet.add(rowId);
			}
			return newSet;
		});
	};

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<>
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
										onClick={() => toggleRowExpansion(row.id)}>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
									{expandedRows.has(row.id) && (
										<TableRow key={`${row.id}-additional-info`}>
											<TableCell
												colSpan={columns.length}
												className='bg-gray-100'>
												<div className='p-4 flex flex-col md:flex-row items-center md:items-start text-center md:text-left'>
													<div className='flex flex-col gap-4 items-center justify-center w-[30%]'>
														<img
															src={row.original.image}
															className='h-[180px] w-[120px] bg-cover'
														/>
														<p>
															<strong>Likes:</strong> {row.original.likes}
														</p>
													</div>
													<div className='flex flex-col gap-1 w-full'>
														<p className='text-2xl font-semibold'>
															{row.original.title}
														</p>
														<p className='text-lg font-semibold'>
															by{" "}
															<span className='italic'>
																{row.original.author}
															</span>
														</p>
														<p className='text-gray-600'>
															{row.original.publisher}
														</p>
														<strong>Reviews:</strong>
														<ul className='pl-4'>
															{row.original.reviews.length > 0 ? (
																row.original.reviews.map((review, index) => (
																	<li key={index}>
																		<p>"{review.text}"</p>
																		<p className='text-xs text-gray-600'>
																			- {review.author}
																		</p>
																	</li>
																))
															) : (
																<p>No reviews found.</p>
															)}
														</ul>
													</div>
												</div>
											</TableCell>
										</TableRow>
									)}
								</>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
