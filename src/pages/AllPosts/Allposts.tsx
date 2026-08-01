import { useEffect, useState } from "react";
import newService from "../../appwrite/config";
import { Container, PostCard, ScrollReveal } from "../../components/index";
import { type AppWriteTableType } from "../../Types/Table.type";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/uxSlice";
import { usePageMeta } from "../../Helper/Function";

const Allposts = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);

    usePageMeta("All Posts | MegaBlog", "Explore all published posts on MegaBlog.");

    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.ux.loading);

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(setLoading(true));
            try {
                const response = await newService.getPosts();
                if (response) {
                    setPosts(response.rows);
                }
            } catch (err) {
                console.log(err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchPosts();
    }, [dispatch]);

    return (
        <div className="bg-(--bg) text-(--text) min-h-screen py-8">
            <Container>
                <h1 className="text-3xl font-bold mb-6">All Posts</h1>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {posts.map((post , index) => (
                            <ScrollReveal key={post.$id} delay={index*0.2}>
                                <PostCard
                                    $id={post.$id}
                                    featuredImage={post.featuredImage}
                                    title={post.title}
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                ) : !loading ? (
                    <p className="text-center text-(--text-muted) py-16">No posts yet. Check back soon.</p>
                ) : null}
            </Container>
        </div>
    );
};

export default Allposts
