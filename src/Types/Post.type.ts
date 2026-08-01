export interface PostType {
    title: string;
    content: string;
    featuredImage: string;
    status: "active" | "inactive";
    userId: string;
};