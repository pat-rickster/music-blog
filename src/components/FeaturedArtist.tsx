import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/16/solid';

export const FeaturedArtist = (props: any) => {
    return (
        <article className="bg-white rounded-md shadow-md relative overflow-hidden">
            <div className="overflow-hidden">
                {props.story.content.on_tour ? <span className="bg-gray-100 text-gray-700 rounded-md py-1 px-2 uppercase font-bold text-xs absolute top-3 right-3 z-10">On Tour</span> : ""}
                <img className="aspect-video object-cover w-full duration-500 hover:scale-105"
                     src={`${props.story.content.main_image.filename}/m/395x222/filters:quality(70)`}
                     alt={props.story.content.main_image.alt} loading={"lazy"}
                />
            </div>
            <div className="p-8">
                <h3 className="text-lg font-bold text-gray-800">
                    {props.story.content.name}
                </h3>
                <Link className="font-bold mt-8 underline text-gray-700" href={`/${props.story.full_slug}`}>
                    <span className="duration-500 hover:mr-0.5">View Artist</span>
                    <ChevronRightIcon className="size-5 text-gray-700 inline-block" />
                </Link>
            </div>
        </article>
);
};