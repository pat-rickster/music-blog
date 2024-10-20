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

export const generateStaticParams = async () => {
    const client = getStoryblokApi();
    const response = await client.getStories({
        content_type: "artist",
        version: process.env.NODE_ENV === "development"
            ? "draft"
            : "published",
    });

    return response.data.stories.map((story) => ({ slug: story.slug }));
}

const fetchArtistPage = async (slug: string) => {
    const { isEnabled } = draftMode();
    const client = getStoryblokApi();
    const response = await client.getStory(`artists/${slug}`, {
        version: process.env.NODE_ENV === "development" || isEnabled
            ? "draft"
            : "published",
    });
    return response.data.story;
};

const ArtistPage = async (props: any) => {
    const story = await fetchArtistPage(props.params.slug);
    return <StoryblokStory story={story} />;
}

export default ArtistPage;