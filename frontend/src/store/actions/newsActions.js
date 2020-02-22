export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const ADD_NEWS_SUCCESS = 'ADD_NEWS_SUCCESS';
export const DELETE_NEWS_SUCCESS = 'DELETE_NEWS_SUCCESS';
export const FETCH_SINGLE_NEWS_SUCCESS = 'FETCH_SINGLE_NEWS_SUCCESS';

export const fetchNews = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8000/recipes/');
            dispatch(fetchRecipesSuccess(response.data));
        } catch (e) {
            console.error('Fetch recipes failed', e);
        }
    }
};