import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

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
    const { isEnabled } = await draftMode();
    const client = getStoryblokApi();
    const response = await client.getStory(`artists/${slug}`, {
        version: process.env.NODE_ENV === "development" || isEnabled
            ? "draft"
            : "published",
    });
    return response.data.story;
};

const ArtistPage = async (props: any) => {
    const { slug } = await props.params;
    const story = await fetchArtistPage(slug);
    return <StoryblokStory story={story} />;
}

export default ArtistPage;