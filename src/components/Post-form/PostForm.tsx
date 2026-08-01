import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import newService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { type PostType } from '../../Types/Post.type';
import { setLoading } from '../../store/uxSlice';

type FormType = {
    title: string,
    slug: string,
    image: FileList,
    status: "active" | "inactive",
    content: string,
};

type PostPropType = PostType & { slug: string, $id: string }

const PostForm = ({ post }: { post?: PostPropType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userdata = useSelector((state: any) => state.auth.userData);

    const slugTransform = useCallback((value: unknown): string => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase().replace(/\s+/g, "-");
        }
        return "";
    }, []);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm<FormType>({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const [error, setError] = useState("");

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            };
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    const submit = async (data: Omit<FormType, "image"> & { image?: FileList }) => {
        dispatch(setLoading(true));
        setError("");
        try {
            if (post) {
                const file = data.image?.[0] ? await newService.uploadFile(data.image[0]) : null;

                if (file === false) {
                    setError("Failed to upload image. Please try again.");
                    return;
                }

                if (file) {
                    await newService.deleteFile(post.featuredImage);
                }

                const dbUpdate = await newService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredImage: file ? file.$id : post.featuredImage
                });

                if (dbUpdate) {
                    navigate(`/post/${dbUpdate.$id}`);
                } else {
                    setError("Failed to update post. Please try again.");
                }
            }
            else {
                const file = data.image?.[0] ? await newService.uploadFile(data.image[0]) : null;

                if (!file) {
                    setError("Failed to upload image. Please try again.");
                    return;
                }

                if (userdata) {
                    const dbPost = await newService.createPost({
                        title: data.title,
                        slug: data.slug,
                        content: data.content,
                        status: data.status,
                        featuredImage: file.$id,
                        userId: userdata.$id
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        setError("Could not create post. The slug may already exist.");
                    }
                }
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
        }
        finally {
            dispatch(setLoading(false));
        };
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            };
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-(--card) border border-(--border) rounded-2xl p-6">
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    readOnly
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 cursor-pointer file:cursor-pointer"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full aspect-video mb-4 overflow-hidden rounded-lg border border-(--border)">
                        <img
                            src={newService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {error && <p className="text-(--danger) text-center mb-4">{error}</p>}
                <Button
                    type="submit"
                    bgColor={post ? "bg-(--accent) hover:bg-(--accent-hover)" : "bg-(--primary) hover:bg-(--primary-hover)"}
                    textColor='text-white'
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
