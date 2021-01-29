import axios from '../apis/backend';
import history from '../history';


export const fetchArticles = (projectId) => async (dispatch, getState) => {
	const response = await axios.get(`/articles/${projectId}`);
	dispatch({ type: 'FETCH_ARTICLES', payload: response.data });
};

export const deleteArticle = (articleId) => async (dispatch) => {
	await axios.delete(`/api/articles/${articleId}`);
	dispatch({ type: 'DELETE_ARTICLE', payload: articleId });
	history.push('/projects');
};

export const updateArticle = (articleId, formValues) => async (dispatch) => {
	console.log('updated');
	const response = await axios.put(`/api/articles/${articleId}`, formValues);
	console.log('response', response.data);
	dispatch({ type: 'UPDATE_ARTICLE', payload: response.data });
};

export const getArticles = (projectId, currentPage) => async (dispatch, getState) => {
	dispatch({
		type    : 'FETCH_ARTICLES_REQUEST',
		payload : { loading: true, projectId: projectId, currentPage: currentPage }
	});
};
