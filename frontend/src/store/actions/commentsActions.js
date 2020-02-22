import axiosApi from '../../axiosApi';

export const FETCH_ALL_COMMENTS_SUCCESS = 'FETCH_ALL_COMMENTS_SUCCESS';
export const FETCH_NEWS_COMMENTS_SUCCESS = 'FETCH_NEWS_COMMENTS_SUCCESS';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';

export const fetchAllCommentsSuccess = comments => ({type: FETCH_ALL_COMMENTS_SUCCESS, comments});
export const fetchNewsCommentsSuccess = ({newsId, comments}) => ({type: FETCH_NEWS_COMMENTS_SUCCESS, payload: {newsId, comments}});
export const addCommentToNewsSuccess = (newsId) => ({type: ADD_COMMENT_SUCCESS, newsId});
export const deleteCommentSuccess = (commentId) => ({type: DELETE_COMMENT_SUCCESS, commentId});

export const fetchAllComments = () => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get('/comments');
            dispatch(fetchAllCommentsSuccess(response.data));
        } catch (e) {
            console.error('Fetch comments failed', e);
        }
    }
};

export const fetchNewsComments = (newsId, comments) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get(`./comments?news_id=${newsId}`, comments);
            dispatch(fetchNewsCommentsSuccess(response.data));
        } catch (e) {
            console.error('Fetch comments failed', e);
        }
    }
};

export const addComment = (newsId, commentData) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.post(`./comments?news_id=${newsId}`, commentData);
            dispatch(addCommentToNewsSuccess(response.data));
        } catch (e) {
            console.error('Adding a comment failed', e);
        }
    };
};

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        try {
            await axiosApi.delete(`./comments/${commentId}`);
            dispatch(deleteCommentSuccess(commentId));
        } catch (e) {
            console.error('Deleting a comment failed', e);
        }
    };
};
