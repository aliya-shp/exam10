import axiosApi from '../../axiosApi';

export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const ADD_NEWS_SUCCESS = 'ADD_NEWS_SUCCESS';
export const DELETE_NEWS_SUCCESS = 'DELETE_NEWS_SUCCESS';
export const FETCH_SINGLE_NEWS_SUCCESS = 'FETCH_SINGLE_NEWS_SUCCESS';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const addNewsSuccess = () => ({type: ADD_NEWS_SUCCESS});
export const deleteNewsSuccess = newsId => ({type: DELETE_NEWS_SUCCESS, newsId});
export const fetchSingleNewsSuccess = newsId => ({type: FETCH_SINGLE_NEWS_SUCCESS, newsId});

export const fetchNews = () => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get('/news');
            dispatch(fetchNewsSuccess(response.data));
        } catch (e) {
            console.error('Fetch news failed', e);
        }
    }
};

export const addNews = newsData => {
    return async (dispatch) => {
        try {
            await axiosApi.post('/news', newsData);
            dispatch(addNewsSuccess());
        } catch (e) {
            console.error('Could not add news', e);
        }
    }
};

export const fetchSingleNews = newsId => {
    return async (dispatch) => {
        const response = axiosApi.get('/news/' + newsId);
        dispatch(fetchSingleNewsSuccess(response.data));
    }
};

export const deleteNews = newsId => {
    return async (dispatch) => {
        axiosApi.delete('/news/' + newsId);
        dispatch(deleteNewsSuccess);
    }
};