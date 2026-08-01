import { useSelector } from "react-redux";
import { Container, PostForm, PrevPostsEdit } from "../../components/index";
import { usePageMeta } from "../../Helper/Function";

const Addpost = () => {
    const userSlugs = useSelector((state : any) => state.allUserSlugs.slugs);
    usePageMeta("Add Post | MegaBlog", "Create a new blog post on MegaBlog.");
    return (
        <div className="py-8 min-h-screen bg-(--bg) text-(--text)">
            <Container>
                <PostForm />
                {userSlugs.length > 0 && <PrevPostsEdit className="mt-8 ml-0 md:ml-2"/>}
            </Container>
        </div>
    );
};

export default Addpost;
