import axios from '../apis/backend';
import history from '../history';

export const deleteArticle = (articleId) => async (dispatch) => {
	await axios.delete(`/api/articles/${articleId}`);
	dispatch({ type: 'DELETE_ARTICLE', payload: articleId });
	history.push('/projects');
};
