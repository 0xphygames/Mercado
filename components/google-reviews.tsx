'use client';

import React, { useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';
import { Star, User, Calendar, Image as ImageIcon } from 'lucide-react';
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

  if (!place || (reviews.length === 0 && photos.length === 0)) {
    return null; // Don't show anything if no data
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
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-red-600" />
              <h3 className="text-xl font-bold text-slate-900">Fotos de Visitantes e Local Guides</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {photos.slice(0, 12).map((photo, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="relative aspect-square overflow-hidden rounded-xl bg-slate-200 shadow-md group"
                >
                  <Image
                    src={photo.getURI({ maxWidth: 400, maxHeight: 400 })}
                    alt="Place Photo"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:rotate-2"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
