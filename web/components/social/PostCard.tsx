'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(post.likedByMe);
  const [likes, setLikes] = useState(post.likeCount);

  async function toggleLike() {
    setLiked(v => !v);
    setLikes(n => (liked ? n - 1 : n + 1));
    const method = liked ? 'DELETE' : 'POST';
    await fetch(`/api/posts/${post.id}/like`, { method });
  }

  return (
    <motion.article whileHover={{ y: -4 }} className="rounded-2xl border border-slate-200 bg-white shadow-md p-4">
      <header className="flex items-center gap-3 mb-3">
        <img src={post.user.image} className="h-9 w-9 rounded-full" />
        <div>
          <a href={`/u/${post.user.handle || post.user.id}`} className="font-semibold">{post.user.name}</a>
          <div className="text-xs text-slate-500">@{post.user.handle}</div>
        </div>
      </header>

      <a href={`/r/${post.rankingId}`} className="block rounded-xl border bg-slate-50 p-3 mb-3">
        <div className="font-bold">{post.ranking.title}</div>
        <div className="text-sm text-slate-600 mt-1">上位: {post.ranking.items.slice(0,3).map((i:any)=>i.name).join('・')}</div>
      </a>

      {post.caption && <p className="text-slate-800 text-sm whitespace-pre-wrap mb-3">{post.caption}</p>}

      <div className="flex items-center gap-4 text-sm">
        <button onClick={toggleLike} className="flex items-center gap-1">
          <span className={`material-icons ${liked ? 'text-rose-500' : 'text-slate-500'}`}>{liked ? 'favorite' : 'favorite_border'}</span>
          <span>{likes}</span>
        </button>
        <a href={`/r/${post.rankingId}#comments`} className="flex items-center gap-1 text-slate-500">
          <span className="material-icons">chat_bubble_outline</span>
          <span>{post.commentCount}</span>
        </a>
        <button onClick={() => navigator.clipboard.writeText(location.origin + '/r/' + post.rankingId)} className="ml-auto text-slate-500">共有</button>
      </div>
    </motion.article>
  );
}
