import Link from "next/link";

export const FeaturedAlbum = (props: any) => {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    const releaseDate = new Date(`${props.story.content.release_date}`).toLocaleDateString("en-GB", options);
    return (
        <div className="md:flex md:p-0 bg-white rounded-md shadow-md overflow-hidden">
            <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none mx-auto md:mx-0"
                 src={props.story.content.main_image.filename}
            />
            <div className="pt-6 md:p-6 text-center md:text-left space-y-1">
                <ul className="flex gap-2">
                    {props.story.content.genre.map((genre: any) => (
                        <li className="bg-gray-100 text-gray-700 rounded-md py-1 px-2 uppercase font-bold text-xs" key={genre}>{genre}</li>
                    ))}
                </ul>
                <h3 className="text-lg font-bold text-gray-800">
                    {props.story.content.name}
                </h3>
                <p>{props.story.content.artist.name}</p>
                <p><time dateTime={props.story.content.release_date}>Release Date: {releaseDate}</time></p>
                <Link className="font-bold mt-8 underline text-gray-700" href={`/${props.story.full_slug}`}>View Album</Link>
            </div>
        </div>
    );
};