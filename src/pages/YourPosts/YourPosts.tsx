import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import newService from "../../appwrite/config";
import { Container, PostCard , ScrollReveal } from "../../components/index";
import { Link } from "react-router-dom";
import type { AppWriteTableType } from "../../Types/Table.type";
import { setLoading } from "../../store/uxSlice";
import { usePageMeta } from "../../Helper/Function";

const YourPosts = () => {
    const [posts, setPosts] = useState<AppWriteTableType[] | null>([]);

    usePageMeta("Your Posts | MegaBlog", "Manage your blog posts on MegaBlog.");
    const loggedInUserInfo = useSelector((state: any) => state.auth);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            dispatch(setLoading(true));
            try {
                const response = await newService.getPostsByUserId(
                    loggedInUserInfo.userData.$id
                );

                if (response) {
                    setPosts(response.rows);
                };
            } catch (err) {
                console.log(err);
            } finally {
                dispatch(setLoading(false));
            }
        };

        if (loggedInUserInfo?.userData?.$id) {
            fetchPosts();
        }
    }, [loggedInUserInfo?.userData?.$id, dispatch]);

    return (
        <div className="w-full py-8 bg-(--bg) text-(--text) min-h-screen">
            <Container>
                <div className="flex flex-wrap gap-4">
                    {posts && posts.length !== 0 ?
                        posts.map((post: any,index) => (
                            <ScrollReveal delay={index*0.2} key={post.$id}>
                                <PostCard
                                    {...post}
                                />
                            </ScrollReveal>
                        ))
                        :
                        <div className="w-full py-16 text-center">
                            <span className="text-3xl font-bold">
                                You don't have any posts yet.{" "}
                                <Link className="underline hover:no-underline text-(--primary)" to={"/add-post"}>
                                    Post your first post
                                </Link>
                            </span>
                        </div>
                    }
                </div>
            </Container>
        </div>
    )
};

export default YourPosts;
