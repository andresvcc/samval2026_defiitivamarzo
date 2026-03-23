import React, { useEffect, useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Loader2 } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { fetchInstagramPosts, type InstagramPost } from '../services/instagram';

interface DisplayPost {
    id: string | number;
    image: string;
    likes: string;
    comments: string;
    caption: string;
    permalink?: string;
}

const InstagramFeed: React.FC = () => {
    const { t } = useTranslation();
    const [posts, setPosts] = useState<DisplayPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLive, setIsLive] = useState(false);

    const staticPosts: DisplayPost[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=800&fit=crop&q=80",
            likes: "1.2k",
            comments: "45",
            caption: t('social_feed.posts.p1')
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=800&fit=crop&q=80",
            likes: "850",
            comments: "32",
            caption: t('social_feed.posts.p2')
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=800&fit=crop&q=80",
            likes: "954",
            comments: "28",
            caption: t('social_feed.posts.p3')
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&h=800&fit=crop&q=80",
            likes: "1.1k",
            comments: "50",
            caption: t('social_feed.posts.p4')
        }
    ];

    useEffect(() => {
        let cancelled = false;

        async function loadPosts() {
            setLoading(true);
            try {
                const igPosts = await fetchInstagramPosts(4);
                if (cancelled) return;
                if (igPosts.length > 0) {
                    const transformedPosts: DisplayPost[] = igPosts.map((post: InstagramPost) => ({
                        id: post.id,
                        image: post.media_type === 'VIDEO'
                            ? (post.thumbnail_url || post.media_url)
                            : post.media_url,
                        likes: '—',
                        comments: '—',
                        caption: post.caption
                            ? (post.caption.length > 120 ? post.caption.substring(0, 120) + '…' : post.caption)
                            : '',
                        permalink: post.permalink
                    }));
                    setPosts(transformedPosts);
                    setIsLive(true);
                } else {
                    setPosts(staticPosts);
                    setIsLive(false);
                }
            } catch {
                if (!cancelled) {
                    setPosts(staticPosts);
                    setIsLive(false);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadPosts();
        return () => { cancelled = true; };
    }, []);

    return (
        <section className="py-24 overflow-hidden" style={{ background: '#e0d6cc' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl text-left">
                        <div className="inline-flex items-center space-x-2 neu-raised-sm px-5 py-2.5 mb-6">
                            <Instagram size={18} className="text-samval-guinda" />
                            <span className="text-xs font-black uppercase tracking-widest text-samval-guinda">{t('social_feed.tag')}</span>
                            {isLive && (
                                <span className="relative flex h-2 w-2 ml-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            )}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-stone-800 mb-6 tracking-tighter leading-none">
                            <Trans i18nKey="social_feed.title" components={{ 1: <span className="text-samval-guinda" /> }} />
                        </h2>
                        <p className="text-lg text-stone-500 font-medium">
                            {t('social_feed.subtitle')}
                        </p>
                    </div>
                    <a
                        href="https://www.instagram.com/fundacionsamval/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-3 neu-raised px-8 py-4 hover:scale-[1.02] transition-all duration-300 font-black"
                    >
                        <span className="text-stone-700">{t('social_feed.view_profile')}</span>
                        <ExternalLink size={18} className="text-samval-guinda group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square neu-pressed rounded-[28px] flex items-center justify-center">
                                <Loader2 size={28} className="text-stone-400 animate-spin" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <a
                                key={post.id}
                                href={post.permalink || "https://www.instagram.com/fundacionsamval/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-square overflow-hidden neu-raised-lg transition-all duration-300 hover:scale-[1.02] block"
                            >
                                <img
                                    src={post.image}
                                    alt={post.caption}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-[28px]"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 rounded-[28px]">
                                    <p className="text-white text-sm font-bold line-clamp-2 mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {post.caption}
                                    </p>
                                    <div className="flex items-center space-x-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        <div className="flex items-center space-x-2">
                                            <Heart size={18} className="fill-samval-accent text-samval-accent" />
                                            <span className="text-sm font-black">{post.likes}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MessageCircle size={18} />
                                            <span className="text-sm font-black">{post.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default InstagramFeed;
