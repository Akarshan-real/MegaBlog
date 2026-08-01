import { useEffect } from "react";
import newService from "../appwrite/config";

export const usePageMeta = (title: string, description?: string) => {
    useEffect(() => {
        document.title = title;
        if (description) {
            let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
            if (!meta) {
                meta = document.createElement("meta");
                meta.name = "description";
                document.head.appendChild(meta);
            }
            meta.content = description;
        }
    }, [title, description]);
};

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const slugToNormal = (slug: string) => {
    if (slug) {
        const x = slug.replace(/\-+/g, " ").trim();
        return x[0].toUpperCase() + x.slice(1);
    };

    return "";
};

export const heightOfHeaderAndFooter = () : number => {
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");

    const footerHeight = footer ? (footer as HTMLElement).offsetHeight : 0;
    const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;

    return footerHeight + headerHeight ;
};

export const getPostBySlug = async (slug: string) => {
    const response = await newService.getPostsByUserId(slug);

    if (!response?.rows || response === null) {
        return null;
    };

    const mapped = response.rows.map((row) => {
        const id = row.$id;
        return {
            slug: id,
            name: slugToNormal(id)
        };
    });

    return {
        names: mapped.map(m => m.name),
        slugs: mapped.map(m => m.slug)
    };
};