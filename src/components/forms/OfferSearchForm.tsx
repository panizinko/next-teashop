"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BedDouble, CalendarDays, Search, Users } from "lucide-react";
import React from "react";

export function OfferSearchForm() {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const location = formData.get("location") as string;
		const dateRange = formData.get("dateRange") as string; // Simplified for now
		const guests = formData.get("guests") as string;

		const queryParams = new URLSearchParams();
		if (location) queryParams.set("location", location);
		if (dateRange) queryParams.set("dateRange", dateRange); // e.g. "2024-08-01_2024-08-07"
		if (guests) queryParams.set("guests", guests);

		window.location.href = `/search?${queryParams.toString()}`; // User corrected path to /search
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="grid grid-cols-1 items-end gap-4 rounded-lg bg-white p-6 shadow-xl sm:p-8 md:grid-cols-4"
		>
			<div className="md:col-span-1">
				<Label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
					Lokalizacja
				</Label>
				<div className="relative">
					<BedDouble className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
					<Input
						type="text"
						name="location"
						id="location"
						placeholder="Np. Warszawa, Kraków"
						className="w-full pl-10"
					/>
				</div>
			</div>
			<div className="md:col-span-1">
				<Label htmlFor="dateRange" className="mb-1 block text-sm font-medium text-gray-700">
					Termin
				</Label>
				{/* Date picker would go here; using simple text input for now */}
				<div className="relative">
					<CalendarDays className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
					<Input
						type="text"
						name="dateRange"
						id="dateRange"
						placeholder="DD.MM.RR-DD.MM.RR"
						className="w-full pl-10"
					/>
				</div>
			</div>
			<div className="md:col-span-1">
				<Label htmlFor="guests" className="mb-1 block text-sm font-medium text-gray-700">
					Goście
				</Label>
				<div className="relative">
					<Users className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
					<Input
						type="number"
						name="guests"
						id="guests"
						placeholder="Np. 2"
						min="1"
						className="w-full pl-10"
					/>
				</div>
			</div>
			<Button
				type="submit"
				className="bg-primary hover:bg-primary/90 mt-4 h-auto w-full py-3 text-base text-white md:col-span-1 md:mt-0"
			>
				<Search className="mr-2 h-5 w-5" /> Szukaj
			</Button>
		</form>
	);
}
