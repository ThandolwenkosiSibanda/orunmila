import axios from '../apis/backend';
import history from '../history';
import { saveAs } from 'file-saver';

export const downloadReport = (project) => async (dispatch, getState) => {
	await axios
		.post('/api/reports', { ...project })
		.then(() => axios.get('/api/reports', { responseType: 'blob' }))
		.then((res) => {
			const pdfBlob = new Blob([ res.data ], { type: 'application/pdf' });
			saveAs(pdfBlob, 'newPdf.pdf');
		});
};
