import Image from 'next/image';

export type TrailPhoto = {
  src: string;
  alt: string;
};

type TrailPhotoGalleryProps = {
  photos: TrailPhoto[];
  title?: string;
};

export default function TrailPhotoGallery({ photos, title = 'Photo Gallery' }: TrailPhotoGalleryProps) {
  return (
    <div className="mt-12 max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105">
            <Image src={photo.src} alt={photo.alt} width={600} height={400} className="object-cover w-full h-64" />
          </div>
        ))}
      </div>
    </div>
  );
} 