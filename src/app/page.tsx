import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

const fetchHomePage = async () => {
    const { isEnabled } = await draftMode();
    console.log(">>>", isEnabled);
    const client = getStoryblokApi();
    const response = await client.getStory(`home`, {
        version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
        resolve_relations: ["featured_artists.artists", "featured_albums.albums", "album.artist", "album.genre", "featured_artist.on_tour"],
    });
    return response.data.story;
};

const HomePage = async () => {
    const story = await fetchHomePage();
    return <StoryblokStory
        bridgeOptions={{ resolveRelations: ["featured_artists.artists", "featured_albums.albums", "album.artist", "album.genre", "featured_artist.on_tour"] }}
        story={story} />;
}

export default HomePage;