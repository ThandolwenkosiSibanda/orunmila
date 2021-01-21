var falafel = require('falafel');

let renderList = (project) => {
	project.articles.map((article) => {
		`<li>${article.Title}</li>`;
	});
};

let AcceptedArticlesList = (project) => {
	let acceptedArticles = project.articles.filter((article) => article.status === 'accepted').map((article) => {
		return `
        <hr>
        <p><strong>Article Title:</strong></p>
        <p>${article.Title}</p>
        <p><strong>Abstract:</strong></p>
        <p>${article.Abstract}</p>
       
        `;
	});

	return acceptedArticles;
};

let VotesList = (votes) => {
	let articlesVotes = votes.map((vote) => {
		if (vote.reason) {
			return `
      <li>${vote.reason}</li>
      `;
		}
		return `
    <li></li>
        `;
	});

	return articlesVotes;
};

let RejectedArticlesList = (project) => {
	let rejectedArticles = project.articles.filter((article) => article.status === 'rejected').map((article) => {
		return `
        <hr>
        <p><strong>Article Title:</strong></p>
        <p>${article.Title}</p>
        <p><strong>Abstract:</strong></p>
        <p>${article.Abstract}</p>

<h6>Reasons for Rejection</h6>

        <ul>
      ${VotesList(article.votes)}
        </ul>

       
        `;
	});

	return rejectedArticles;
};

let RejectedArticlesCount = (project) => {
	let rejectedArticles = project.articles.filter((article) => article.status === 'rejected');
	return rejectedArticles.length;
};

let AcceptedArticlesCount = (project) => {
	let acceptedArticles = project.articles.filter((article) => article.status === 'accepted');
	return acceptedArticles.length;
};

module.exports = (project) => {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: "Helvetica Neue", sans-serif;
          color: #333;
          padding: 20px;
        }
  
        p {
           page-break-inside: avoid;
        }
  
        table {
           width: 100%;
           text-align: left;
        }
  
        thead {
          display: table-header-group;
        }

        li{
          list-style-type: none;
        }
  
      </style>
    </head>
    <body>
    
           
 

    <h6><span> Project ID: ${project._id}  </span></h6>
    <h6><span>Project Title:  ${project.title}</span></h6>
    <h6><span> Total Articles: ${project.articles.length}</span>
     <span>Accepted Articles: ${AcceptedArticlesCount(
			project
		)} </span> <span> Rejected Articles:  ${RejectedArticlesCount(project)} </span>
    </h6>
    
 
   

   <h5>Accepted Articles:</h5>
       
        ${AcceptedArticlesList(project)}


        <h5>Rejected Articles:</h5>

        ${RejectedArticlesList(project)}
        
    </body>
  </html>
`;
};
