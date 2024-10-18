import Link from "next/link";

export const FeaturedArtist = (props: any) => {
    console.log(props.story.content.on_tour);
    const onTour = props.story.content.on_tour;
    return (
        <div className="bg-white rounded-md shadow-md overflow-hidden relative">
            {props.story.content.on_tour ? <span className="bg-gray-100 text-gray-700 rounded-md py-1 px-2 uppercase font-bold text-xs absolute top-3 right-3">On Tour</span> : ""}
            <img className="aspect-video object-cover w-full"
                 src={props.story.content.main_image.filename}
            />
            <div className="p-8">
                <h3 className="text-lg font-bold text-gray-800">
                    {props.story.content.name}
                </h3>
                <Link className="font-bold mt-8 underline text-gray-700" href={`/${props.story.full_slug}`}>View
                    Artist</Link>
            </div>
        </div>
    );
};