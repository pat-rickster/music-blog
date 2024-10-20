import { getStoryblokApi, StoryblokStory, storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

const cachedFetch = (input: any, init?: any): Promise<Response> => {
    return fetch(input, {
        ...init,
        cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    });
};

storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    apiOptions: {
        fetch: cachedFetch,
    },
});

const fetchHomePage = async () => {
    const { isEnabled } = draftMode();
    const client = getStoryblokApi();
    const response = await client.getStory(`home`, {
        version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
        resolve_relations: ["featured_artists.artists", "featured_albums.albums", "album.artist", "album.genre", "featured_artist.on_tour"],
    });
    return response.data.story;
};

const HomePage = async () => {
    const story = await fetchHomePage();
    return <StoryblokStory story={story} />;
}

export default HomePage;