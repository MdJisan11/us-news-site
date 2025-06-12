import React, { useEffect, useState } from "react";

export default function USNewsSite() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://gnews.io/api/v4/top-headlines?country=us&token=40a6b0c69145cbb69cbfe28bd9823853"
        );
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      }
      setLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🇺🇸 US Breaking News</h1>
      {loading ? (
        <p>Loading latest news...</p>
      ) : (
        <div className="grid gap-4">
          {news.map((article, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {new Date(article.publishedAt).toLocaleString()}
              </p>
              <p>{article.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
