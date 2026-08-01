import { Link } from 'react-router-dom';
import newService from '../../appwrite/config';
import { type AppWriteTableType } from '../../Types/Table.type';
import { useMemo } from 'react';

const PostCard = ({ $id, title, featuredImage }: Pick<AppWriteTableType, "$id" | "title" | "featuredImage">) => {
    return useMemo(() => (
        <Link to={`/post/${$id}`} className='group'>
            <div className='w-full bg-(--card) border border-(--border) rounded-xl p-4 transition hover:bg-(--surface)'>
                <div className='w-full aspect-video mb-4 overflow-hidden rounded-xl'>
                    <img
                        className='w-full h-full object-cover'
                        src={newService.getFileView(featuredImage)}
                        alt={title}
                    />
                </div>
                <h2 className='text-xl font-bold text-(--text) transition-all duration-300 group-hover:text-(--primary)'>
                    {title}
                </h2>
            </div>
        </Link>
    ), [$id, title, featuredImage]);
};

export default PostCard;
