import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // here i am fetching data from api, we only have one api that whdy i used static url base `http://localhost:3000` 
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/news');
        setNews(response.data.articles);
        console.log(response);
      } catch (err) {
        console.log("err : ", err)
        // i'm using toastify to show error if an error come
        toast.error('Failed to load news. Please try again later.')
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section>
      <h2 className='text-center py-4 bg-info mb-4'>Top Headlines</h2>
      <Container>
        {loading ?
          <div className='text-center loader-div'>
            <Spinner 
              animation="border"
            />
          </div>
        : news.map((article, index) => (
          // i created a resusable componet for to show a news 
          <NewsCard 
            {...article}
            key={index}
          />
        ))}
      </Container>
    </section>
  );
};

export default NewsSection;
