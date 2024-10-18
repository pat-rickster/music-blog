"use client";
import type { PropsWithChildren } from "react";
import { storyblokInit } from "@storyblok/react/rsc";
import { Artist } from "./Artist";
import { Album } from "./Album";
import { Page } from "./Page";
import { Hero } from "./Hero";
import { Grid } from "./Grid";
import { Feature } from "./Feature";
import { FeaturedArtists} from "@/components/FeaturedArtists";
import { FeaturedAlbums} from "@/components/FeaturedAlbums";

storyblokInit({
    components: {
        artist: Artist,
        album: Album,
        page: Page,
        hero: Hero,
        grid: Grid,
        feature: Feature,
        featured_artists: FeaturedArtists,
        featured_albums: FeaturedAlbums,
    },
    enableFallbackComponent: true,
});

export const StoryblokProvider = ({ children }: PropsWithChildren) => {
    return <>{children}</>;
};
