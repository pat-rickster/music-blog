import { renderRichText, storyblokEditable, RichTextSchema, ISbNode } from "@storyblok/react/rsc";
import Image from "next/image";
import { StarIcon } from '@heroicons/react/16/solid'

export const Album = (props: any) => {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    // @ts-expect-error sgsfgfsgsfg
    const releaseDate = new Date(`${props.blok.release_date}`).toLocaleDateString("en-GB", options);
    const ratingNumber = Number(`${props.blok.rating}`);
    const ratingActive = [...Array(ratingNumber)].map((_, i) => {
        return (<li key={i}><StarIcon className="size-5 text-gray-700 inline-block"/></li>);
    });
    const ratingInactive = [...Array(5 - ratingNumber)].map((_, i) => {
        return (<li key={i}><StarIcon className="size-5 text-gray-200 inline-block"/></li>);
    });
    return (
        <main {...storyblokEditable(props.blok)} className="container mx-auto px-4 w-full pt-32 pb-16">
            <h1 className="text-3xl md:text-5xl font-bold">
                {props.blok.name}
            </h1>
            <p>
                {props.blok.artist.name}
            </p>
            <ul className="flex gap-2">
                {props.blok.genre.map((genre: any) => (
                    <li className="bg-gray-100 text-gray-700 rounded-md py-1 px-2 uppercase font-bold text-xs"
                        key={genre}>{genre}</li>
                ))}
            </ul>
            <p>
                <time dateTime={props.blok.release_date}>Release Date: {releaseDate}</time>
            </p>
            <p>Rating:</p>
            <ul className="flex">
                {ratingActive}
                {ratingInactive}
            </ul>

            <Image
                className="mt-12"
                src={props.blok.main_image.filename}
                alt={props.blok.main_image.alt}
                width={props.blok.main_image.filename.split("/")[5].split("x")[0]}
                height={props.blok.main_image.filename.split("/")[5].split("x")[1]}
                sizes="(max-width: 1538px) 100vw, 1504px"
                priority={true}
            />
            <p className="mt-12 text-lg md:text-2xl md:leading-relaxed">
                {props.blok.introduction}
            </p>
            <div
                className="prose md:prose-lg mt-16 max-w-none"
                dangerouslySetInnerHTML={{
                    __html: renderRichText(props.blok.body, {
                        schema: {
                            ...RichTextSchema,
                            nodes: {
                                ...RichTextSchema.nodes,
                                image: (node: ISbNode) => ({
                                    singleTag: [
                                        {
                                            tag: "img",
                                            attrs: {
                                                src: `${node.attrs.src}/m/1504x0/filters:quality(75)`,
                                                alt: node.attrs.alt,
                                                loading: "lazy",
                                                width: node.attrs.src.split("/")[5].split("x")[0],
                                                height: node.attrs.src.split("/")[5].split("x")[1],
                                            },
                                        },
                                    ],
                                }),
                            },
                        },
                    }),
                }}
            ></div>
        </main>
    );
};