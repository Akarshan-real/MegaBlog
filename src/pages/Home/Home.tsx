import { useEffect, useState } from "react"
import newService from "../../appwrite/config"
import { Container, PostCard, ScrollReveal } from "../../components/index"
import type { AppWriteTableType } from "../../Types/Table.type";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/uxSlice";
import { Link } from "react-router-dom";
import { heightOfHeaderAndFooter, usePageMeta } from "../../Helper/Function";

const Home = () => {
    const [posts, setPosts] = useState<AppWriteTableType[]>([]);
    const [totalHeight, setTotalHeight] = useState<number>(0);

    usePageMeta("Home | MegaBlog", "Browse the latest blog posts on MegaBlog.");

    const dispatch = useDispatch();
    const authStatus = useSelector((state: any) => state.auth.status);

    useEffect(() => {
        const handleResize = () => setTotalHeight(heightOfHeaderAndFooter());
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize",handleResize);
    }, []);

    useEffect(() => {
        const hehe = async () => {
            try {
                dispatch(setLoading(true));
                setTotalHeight(heightOfHeaderAndFooter())
                const response = await newService.getPosts();

                if (response) {
                    setPosts(response.rows);
                };
            } catch (error) {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
            };
        };
        hehe();
    }, []);

    if (posts.length > 0) {
        return (
            <div className="w-full py-8 home bg-(--bg) text-(--text)">
                <Container>
                    <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
                    <div className="flex flex-wrap gap-4">
                        {posts.map((post) => (
                            <ScrollReveal key={post.$id} delay={0.1}>
                                    <PostCard
                                        {...post}
                                    />
                            </ScrollReveal>
                        ))}
                    </div>
                </Container>
            </div>
        )
    };

    return (
        <div
            className="w-full flex flex-col items-center justify-center bg-(--bg) text-(--text) text-center py-4"
            style={{ minHeight: `calc(100vh - ${totalHeight}px)` }}
        >
            <h1 className="text-2xl font-bold hover:text-(--primary) transition">
                <Link to={authStatus ? "/add-post" : "/login"} className="flex items-center justify-center">
                    {authStatus ? "Create your first post" : "Get started to explore posts"}
                </Link>
            </h1>
        </div>
    );
}

export default Home
