import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import { FeaturedArtist } from "@/components/FeaturedArtist";
import { draftMode } from "next/headers";

const fetchArtistsPage = async () => {
    const { isEnabled } = await draftMode();
    const client = getStoryblokApi();
    const response = await client.getStory(`artists`, {
        version: process.env.NODE_ENV === "development" || isEnabled
            ? "draft"
            : "published",
    });
    return response.data.story;
};

const fetchAllArtists = async () => {
    const { isEnabled } =  await draftMode();
    const client = getStoryblokApi();
    const response = await client.getStories({
        content_type: "artist",
        version: process.env.NODE_ENV === "development" || isEnabled
            ? "draft"
            : "published",
    })
    return response.data.stories;
}

const ArtistsPage = async () => {
    const story = await fetchArtistsPage();
    const artists = await fetchAllArtists();
    return (
        <div>
            <StoryblokStory story={story} />
            <div className="grid md:grid-cols-3 gap-8 container mx-auto px-4 w-full py-16">
                {artists.map((artist) => (
                    <FeaturedArtist story={artist} key={artist.content._uid} />
                ))}
            </div>
        </div>
    );
}

export default ArtistsPage;