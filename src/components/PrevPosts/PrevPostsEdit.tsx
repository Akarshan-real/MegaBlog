import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { slugToNormal } from '../../Helper/Function';
import { ScrollReveal } from "../index";

const PrevPostsEdit = 
({ className = "", suggestedtext = "Edit your previous posts :", exceptSlug = "" }: { className?: string, suggestedtext?: string, exceptSlug?: string }) => {
    const userSlugs = useSelector((state: any) => state.allUserSlugs.slugs);
    let visibleIndex = 0;
    
    return (
        <div className={`w-full flex flex-wrap gap-y-6 items-center gap-4 ${className}`}>
            <div className="py-2 px-4 bg-(--surface) text-(--text-muted) border border-(--border) rounded-lg">
                <span>{suggestedtext}</span>
            </div>
            {userSlugs.map((post: string) => {
                if (post === exceptSlug) return null;

                return (
                    <ScrollReveal key={post} delay={visibleIndex++ * 0.3} element='span'>
                        <Link
                            to={`/edit-post/${post}`}
                            className="px-4 py-2 rounded-lg bg-(--card) text-(--text) border border-(--border) transition-all duration-200 hover:bg-(--surface) hover:text-(--primary) hover:border-(--primary)"
                        >
                            {slugToNormal(post)}
                        </Link>
                    </ScrollReveal>
                )
            })}
        </div>
    );
};

export default PrevPostsEdit
