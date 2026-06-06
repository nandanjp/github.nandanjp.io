import { CollageCluster } from './collage-cluster'
import { PhotoCard } from './photo-card'
import type { Photo } from '@/lib/api'

interface PhotoGridProps {
    photos: Photo[]
    onPhotoClick: (photo: Photo) => void
}

const COLLAGE_SIZE = 3

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
    const collagePhotos = photos.slice(0, COLLAGE_SIZE)
    const gridPhotos = photos.slice(COLLAGE_SIZE)

    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8">
            {collagePhotos.length === COLLAGE_SIZE && (
                <CollageCluster
                    photos={collagePhotos}
                    startIndex={0}
                    onPhotoClick={onPhotoClick}
                />
            )}
            {gridPhotos.map((photo, i) => (
                <PhotoCard
                    key={photo.key}
                    photo={photo}
                    index={COLLAGE_SIZE + i}
                    onClick={onPhotoClick}
                />
            ))}
        </div>
    )
}
