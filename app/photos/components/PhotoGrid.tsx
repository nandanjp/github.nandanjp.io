import { CollageCluster } from './CollageCluster'
import { PhotoCard } from './PhotoCard'
import type { Photo } from '@/lib/api'

const COLLAGE_SIZE = 3

interface PhotoGridProps {
    photos: Photo[]
    onPhotoClick: (photo: Photo) => void
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
    const collagePhotos = photos.slice(0, COLLAGE_SIZE)
    const gridPhotos = photos.slice(COLLAGE_SIZE)

    return (
        <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-3 lg:gap-8">
            {collagePhotos.length === COLLAGE_SIZE && (
                <CollageCluster
                    photos={collagePhotos}
                    startIndex={0}
                    onPhotoClick={onPhotoClick}
                />
            )}
            {gridPhotos.map((photo, gridIndex) => (
                <PhotoCard
                    key={photo.key}
                    photo={photo}
                    index={COLLAGE_SIZE + gridIndex}
                    priority={gridIndex < 3}
                    onClick={onPhotoClick}
                />
            ))}
        </div>
    )
}
