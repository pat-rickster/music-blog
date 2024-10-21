import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import { FeaturedAlbum } from "@/components/FeaturedAlbum";
import { draftMode } from "next/headers";

const fetchAlbumsPage = async () => {
    const { isEnabled } = draftMode();
    const client = getStoryblokApi();
    const response = await client.getStory(`albums`, {
        version: process.env.NODE_ENV === "development" || isEnabled
            ? "draft"
            : "published",
    });
    return response.data.story;
};

const fetchAllAlbums = async () => {
    const { isEnabled } = draftMode();
    const client = getStoryblokApi();
    const response = await client.getStories({
        content_type: "album",
        version:
    process.env.NODE_ENV === "development" || isEnabled
        ? "draft"
        : "published",
        resolve_relations: "album.artist",
    })
    return response.data.stories;
}

const AlbumsPage = async () => {
    const story = await fetchAlbumsPage();
    const albums = await fetchAllAlbums();
    return (
        <div>
            <StoryblokStory story={story} />
            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-8 container mx-auto px-4 w-full py-16">
                {albums.map((album) => (
                    <FeaturedAlbum story={album} key={album.content._uid} />
                ))}
            </div>
        </div>
    );
}

export default AlbumsPage;