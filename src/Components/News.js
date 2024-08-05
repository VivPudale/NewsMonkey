import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async (pageNo) => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=41d2c6320e6f490ea5f946d52e5cc617&page=${pageNo}&pageSize=${props.pageSize}`;

    setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - NewsMonkey`;
    updateNews(page);
  }, []);

  const handleNextClick = async () => {
    const pageNo = page + 1;
    setPage(pageNo);
    updateNews(pageNo);
  };

  const handlePreviousClick = async () => {
    const pageNo = page - 1;
    setPage(pageNo);
    updateNews(pageNo);
  };

  return (
    <div className="container my-3">
      <h1
        className="text-center "
        style={{
          margin: "35px 0px",
          marginTop: "90px",
        }}
      >
        NewsMonkey - Top headlines from {capitalize(props.category)}
      </h1>
      {loading && <Spinner />}
      <div className="row col md-12">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="col md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-dark"
          disabled={page <= 1}
          onClick={handlePreviousClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page > Math.ceil(totalResults / props.pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
