import { getStoryblokApi, StoryblokStory } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

export const generateStaticParams = async (slug: any) => {
    const client = getStoryblokApi();
    const response = await client.getStories({
        content_type: "album",
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });

    return response.data.stories.map((story) => ({ slug: story.slug }));
}

const fetchAlbumPage = async (slug: string) => {
    const { isEnabled } = draftMode();
    const client = getStoryblokApi();
    const response = await client.getStory(`albums/${slug}`, {
        version: process.env.NODE_ENV === "development" || isEnabled
            ? "draft"
            : "published",
        resolve_relations: "album.artist",
    });
    return response.data.story;
};

const AlbumPage = async (props: any) => {
    const story = await fetchAlbumPage(props.params.slug);
    return <StoryblokStory story={story} />;
}

export default AlbumPage;