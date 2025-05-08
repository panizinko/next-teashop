import { OfferSearchForm } from "@/components/forms/OfferSearchForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
	const supabase = await createClient();
	const { data: offers } = await supabase.from("offers").select();

	const featuredOffers = offers?.slice(0, 3);

	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white">
			<section
				className="bg-cover bg-center py-16 text-center sm:py-24"
				// style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
			>
				<div className="container mx-auto px-4">
					<h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">Dokąd się wybierasz?</h1>
					<p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100 sm:text-xl">
						Odkryj wyjątkowe miejsca na nocleg w całej Polsce. Znajdź idealną ofertę dla siebie.
					</p>
					<div className="mx-auto max-w-3xl">
						<OfferSearchForm />
					</div>
				</div>
			</section>

			<section className="bg-slate-50 py-12 sm:py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-10 text-center text-3xl font-bold text-slate-800 sm:mb-12 sm:text-4xl">
						Popularne Oferty
					</h2>
					{featuredOffers && featuredOffers.length > 0 ? (
						<div
							data-testid="rent-offer-list"
							className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
						>
							{featuredOffers?.map((offer) => (
								<Card
									key={offer.id}
									className="flex flex-col overflow-hidden bg-white text-slate-800 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
								>
									<CardHeader className="p-0">
										<div className="relative h-56 w-full">
											{offer.images?.length > 0 ? (
												<Image
													fill
													src={offer.images[0]}
													alt={`Zdjęcie oferty: ${offer.name}`}
													className="object-cover"
													loading="lazy"
												/>
											) : (
												<div className="flex h-full items-center justify-center bg-gray-100">
													<p className="text-gray-400">Brak zdjęć</p>
												</div>
											)}
										</div>
									</CardHeader>
									<CardContent className="flex-grow p-5 sm:p-6">
										<Badge
											variant="secondary"
											className="mb-2 border-blue-300 bg-blue-100 text-blue-700"
										>
											{offer.type}
										</Badge>
										<CardTitle className="text-primary/90 mb-1 text-xl font-semibold sm:text-2xl">
											{offer.name}
										</CardTitle>
										<div className="mb-3 flex items-center text-sm text-gray-500">
											<MapPin size={16} className="text-primary mr-1.5" />
											<span>{offer.location_city}</span>
										</div>
										<CardDescription className="mb-4 line-clamp-3 text-sm text-gray-600">
											{offer.description}
										</CardDescription>
									</CardContent>
									<CardFooter className="flex flex-col items-start border-t bg-slate-50/70 p-5 sm:p-6">
										<div className="mb-3 flex w-full items-center justify-between">
											<p className="text-primary text-lg font-bold">
												{offer.price_per_night} PLN{" "}
												<span className="text-xs font-normal text-gray-500">/ noc</span>
											</p>
											<div className="flex items-center text-sm text-gray-600">
												<Users size={16} className="text-primary mr-1.5" />
												<span>Do {offer.max_guests} osób</span>
											</div>
										</div>
										<Link href={`/oferty/${offer.slug}`} passHref>
											<Button asChild className="bg-primary hover:bg-primary/90 w-full text-white">
												Zobacz Szczegóły
											</Button>
										</Link>
									</CardFooter>
								</Card>
							))}
						</div>
					) : (
						<p className="text-center text-gray-700">Brak wyróżnionych ofert do wyświetlenia.</p>
					)}
				</div>
			</section>
		</main>
	);
}
