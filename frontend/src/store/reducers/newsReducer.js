import {
    ADD_NEWS_SUCCESS,
    DELETE_NEWS_SUCCESS,
    FETCH_NEWS_SUCCESS,
    FETCH_SINGLE_NEWS_SUCCESS
} from "../actions/newsActions";

const initialState = {
    news: [],
    singleNews: null,
};

const orderNews = (state, newsId) => {
    return state.news.filter(news => news.id !== news.newsId);
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
      case FETCH_NEWS_SUCCESS:
          return {
              ...state,
              news: action.news
          };
      case FETCH_SINGLE_NEWS_SUCCESS:
          return {
              ...state,
              newsId: action.newsId
          };
      case ADD_NEWS_SUCCESS:
          return {
              ...state,
              singleNews: action.newsId,
          };
      case DELETE_NEWS_SUCCESS:
          return {
              ...state,
              stories: orderNews(state, action.newsId)
          };
      default:
          return state;
  }
};

export default newsReducer;