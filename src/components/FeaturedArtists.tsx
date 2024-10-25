import { FeaturedArtist } from "@/components/FeaturedArtist";
import { storyblokEditable } from "@storyblok/react/rsc";

export const FeaturedArtists = (params: any) => {
    return (
        <section {...storyblokEditable(params.blok)} className="py-16 container m-auto w-full px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
                {params.blok.headline}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
                {params.blok.artists.map((artist: any) => (
                    <FeaturedArtist story={artist} key={artist.content._uid} />
                ))}
            </div>
        </section>
    );
};