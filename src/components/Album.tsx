import { renderRichText } from "@storyblok/react/rsc";

export const Album = (props: any) => {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    // @ts-expect-error sgsfgfsgsfg
    const releaseDate = new Date(`${props.blok.release_date}`).toLocaleDateString("en-GB", options);
    return (
        <main className="container mx-auto px-4 w-full pt-32 pb-16">
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
            <img className="mt-12" src={props.blok.main_image.filename}/>
            <p className="mt-12 text-lg md:text-2xl md:leading-relaxed">
                {props.blok.introduction}
            </p>
            <div
                className="prose md:prose-lg mt-16 max-w-none"
                dangerouslySetInnerHTML={{
                __html: renderRichText(props.blok.body),
            }}>

            </div>
        </main>
    );
};