import { storyblokEditable } from "@storyblok/react/rsc";

export const Feature = (params: any) => {
    return (
        <div {...storyblokEditable(params.blok)} className="bg-white p-8 rounded-md shadow-md">
            <h3 className="font-bold text-3xl text-gray-800">{params.blok.headline}</h3>
            <p className="mt-6 text-lg text-gray-700">{params.blok.content}</p>
        </div>
    );
};