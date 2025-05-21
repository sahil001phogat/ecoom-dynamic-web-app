
import { Link } from "react-router-dom";
import { useState } from "react";

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    content: string;
    date: string;
    category: string;
    image: string;
    likes: number;
  };
  onLikeToggle: (id: string, liked: boolean) => void;
}

const NewsCard = ({ news, onLikeToggle }: NewsCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(news.likes);

  const handleLikeClick = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLikeToggle(news.id, newLikedState);
  };

  // Format the date
  const formattedDate = new Date(news.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {news.image && (
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{formattedDate}</span>
          <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full">
            {news.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.content}</p>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleLikeClick}
            className="flex items-center space-x-1 text-sm"
          >
            <svg 
              className={`w-5 h-5 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>{likeCount}</span>
          </button>
          
          <Link 
            to={`/news/${news.id}`} 
            className="text-primary hover:underline text-sm font-medium"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
