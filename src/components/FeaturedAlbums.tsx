import { FeaturedAlbum } from "@/components/FeaturedAlbum";

export const FeaturedAlbums = (params: any) => {
    return (
        <section className="py-16 container m-auto w-full px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
                {params.blok.headline}
            </h2>
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-8 mt-16">
                {params.blok.albums.map((album: any) => (
                    <FeaturedAlbum story={album} key={album.content._uid} />
                ))}
            </div>
        </section>
    );
};