'use client';

import React, { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';
import { Star, User, Image as ImageIcon, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface GoogleReviewsProps {
  placeName: string;
  location: { lat: number; lng: number };
}

export default function GoogleReviews({ placeName, location }: GoogleReviewsProps) {
  const placesLib = useMapsLibrary('places');
  const [place, setPlace] = useState<google.maps.places.Place | null>(null);
  const [reviews, setReviews] = useState<google.maps.places.Review[]>([]);
  const [photos, setPhotos] = useState<google.maps.places.Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!placesLib || !location) return;

    const fetchPlaceDetails = async () => {
      try {
        const { Place } = placesLib;
        
        const searchRequest: google.maps.places.SearchByTextRequest = {
          textQuery: placeName,
          locationBias: location,
          maxResultCount: 1,
          fields: ['id', 'displayName', 'rating', 'userRatingCount'],
        };

        const { places } = await Place.searchByText(searchRequest);

        if (places && places.length > 0) {
          const foundPlace = places[0];
          
          // Fetch reviews and photos
          await foundPlace.fetchFields({
            fields: ['reviews', 'photos', 'rating', 'userRatingCount', 'displayName', 'id']
          });

          setPlace(foundPlace);
          setReviews(foundPlace.reviews || []);
          setPhotos(foundPlace.photos || []);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [placesLib, placeName, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  const mapsLink = place?.id
    ? `https://www.google.com/maps/place/?q=place_id:${place.id}`
    : 'https://maps.app.goo.gl/TWzoxuSqDiUtStHi9';

  if (!place || (reviews.length === 0 && photos.length === 0)) {
    return (
      <section id="avaliacoes" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-900">Veja nossa presença no Google Maps</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Confira as fotos públicas, avaliações e comentários dos clientes diretamente no perfil oficial do Mercadinho Brisa Mar.
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
            >
              Ver avaliações e fotos no Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-4 text-xs text-slate-400">Conteúdo e comentários exibidos pelo Google Maps.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="avaliacoes" className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">O que dizem nossos clientes</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 fill-current ${i < Math.floor(place.rating || 0) ? 'text-amber-500' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-slate-900">{place.rating?.toFixed(1)}</span>
              <span className="text-slate-500">({place.userRatingCount} avaliações no Google)</span>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/place/?q=place_id:${place.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-200"
          >
            Ver todas no Google
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-2xl bg-slate-50 p-6 border border-slate-100 h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                {review.authorAttribution?.photoURI ? (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white shadow-sm">
                    <Image
                      src={review.authorAttribution.photoURI}
                      alt={review.authorAttribution?.displayName || 'User'}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <User className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-slate-900">{review.authorAttribution?.displayName}</div>
                  <div className="text-xs text-slate-500">{review.relativePublishTimeDescription}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 fill-current ${i < (review.rating || 0) ? 'text-amber-500' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-slate-600 flex-grow italic">
                {review.text ? `"${review.text}"` : 'Sem comentário.'}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Photos / Local Guide Mosaico */}
        {photos.length > 0 && (
          <div className="mt-24 border-t border-slate-100 pt-16">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Galeria Local Guide</h3>
                  <p className="text-sm text-slate-500 text-wrap-balance">Fotos reais enviadas pela comunidade no Google Maps</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-xs font-bold text-orange-700 border border-orange-100">
                <Star className="h-3 w-3 fill-current" />
                Google Local Guide Contributions
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {photos.slice(0, 18).map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.05 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className={`relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-sm group cursor-zoom-in ${
                    i === 0 || i === 7 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <Image
                    src={photo.getURI({ maxWidth: 800, maxHeight: 800 })}
                    alt={`Foto do Mercadinho Brisa Mar - Contribuição ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-sm text-slate-400 italic">
                Todas as imagens acima são de domínio público e extraídas via Google Maps Platform.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
