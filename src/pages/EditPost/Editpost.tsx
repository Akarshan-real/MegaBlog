import { useEffect, useState } from 'react';
import { Container, PostForm, PrevPostsEdit } from "../../components/index";
import newService from '../../appwrite/config';
import { type AppWriteExtendedTableType } from '../../Types/Extended.table.type';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../store/uxSlice';
import { usePageMeta } from "../../Helper/Function";

const Editpost = () => {
    const [post, setPost] = useState<AppWriteExtendedTableType | null>(null);

    usePageMeta("Edit Post | MegaBlog", "Edit your blog post on MegaBlog.");
    const userSlugs = useSelector((state : any) => state.allUserSlugs.slugs);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const hehe = async () => {
            try {
                dispatch(setLoading(true));
                if (slug) {
                    const response = await newService.getPost(slug);

                    if (response) {
                        setPost(response);
                    }
                }
                else {
                    navigate("/");
                };
            }
            catch (error) {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
            };
        };
        hehe();
    }, [slug, navigate, dispatch]);

    const mapPostToForm = (post: AppWriteExtendedTableType): AppWriteExtendedTableType & { slug: string } => {
        console.log(post);
        return {
            ...post,
            slug: post.$id,
            status: post.status === "inactive" ? "inactive" : "active"
        };
    };

    if (post) {
        return (
            <div className='py-8 bg-(--bg) text-(--text) min-h-screen'>
                <Container>
                    <PostForm
                        post={mapPostToForm(post)}
                    />
                    {userSlugs.length > 1 && <PrevPostsEdit className='mt-8 ml-2' exceptSlug={post.$id} />}
                </Container>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-(--bg) text-(--text)" />
    );
}

export default Editpost
