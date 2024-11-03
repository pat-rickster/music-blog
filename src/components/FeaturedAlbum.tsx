import Link from "next/link";
import { ChevronRightIcon } from '@heroicons/react/16/solid';

export const FeaturedAlbum = (props: any) => {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    // @ts-expect-error sgsfgfsgsfg
    const releaseDate = new Date(`${props.story.content.release_date}`).toLocaleDateString("en-GB", options);
    return (
        <article className="lg:flex p-6 lg:p-0 bg-white rounded-md shadow-md overflow-hidden">
            <img className="w-72 h-72 md:w-48 md:h-auto md:rounded-none mx-auto lg:mx-0 duration-500 hover:scale-105"
                 src={`${props.story.content.main_image.filename}/m/300x300/filters:quality(70)`} alt={props.story.content.main_image.alt} loading={"lazy"}
            />
            <div className="pt-6 lg:p-6 text-center lg:text-left flex flex-col w-full">
                <ul className="flex gap-2 justify-center lg:justify-start">
                    {props.story.content.genre.map((genre: any) => (
                        <li className="bg-gray-100 text-gray-700 rounded-md py-1 px-2 uppercase font-bold text-xs" key={genre}>{genre}</li>
                    ))}
                </ul>
                <h3 className="text-lg font-bold text-gray-800">
                    {props.story.content.name}
                </h3>
                <p>{props.story.content.artist.name}</p>
                <p className="text-gray-700"><time dateTime={props.story.content.release_date}>Release Date: {releaseDate}</time></p>
                <Link className="font-bold underline text-gray-700 mx-auto lg:mx-0 mt-auto mr-auto" href={`/${props.story.full_slug}`}>
                    <span className="duration-500 hover:mr-0.5">View Album</span>
                    <ChevronRightIcon className="size-5 text-gray-700 inline-block" />
                </Link>
            </div>
        </article>
    );
};