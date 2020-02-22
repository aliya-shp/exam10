import {
    ADD_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS,
    FETCH_ALL_COMMENTS_SUCCESS,
    FETCH_NEWS_COMMENTS_SUCCESS
} from "../actions/commentsActions";

const initialState = {
    news: [],
    comments: [],
};

const orderComments = (state, commentId) => {
    return state.comments.filter(comment => comment.id !== commentId);
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_COMMENTS_SUCCESS:
            return {
                ...state,
                news: action.news,
            };
        case FETCH_NEWS_COMMENTS_SUCCESS:
            return {
                ...state,
                newsId: action.newsId,
            };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                newsId: action.newsId,
            };
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: orderComments(state, action.commentId),
            };
        default:
            return state;
    }
};

export default commentsReducer;