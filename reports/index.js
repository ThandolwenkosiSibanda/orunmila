var falafel = require('falafel');

let renderList = (project) => {
	project.articles.map((article) => {
		`<li>${article.Title}</li>`;
	});
};

let AcceptedArticlesList = (project) => {
	let acceptedArticles = project.articles.filter((article) => article.status === 'accepted').map((article) => {
		let voteScore = article.votes.map((vote) => vote.score).reduce((prev, next) => prev + next);
		let averageScore = voteScore * 20 / article.votes.length;

		return `
        <hr>
        <p><strong>Article Title:</strong></p>
        <p>${article.Title}</p>
        <p><strong>Abstract:</strong></p>
        <p>${article.Abstract}</p>
        <button class= 'btn btn-primary'>Article Score: ${Math.floor(averageScore)} % </button>
       
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

let AverageScore = (votes) => {
	let votesCount = votes.map((vote) => {
		return vote;
	});

	let voteScore = votes.map((vote) => vote.score).reduce((prev, next) => prev + next);

	let averageScore = voteScore * 20 / votesCount.length;

	return Math.floor(averageScore);
};

let RejectedArticlesList = (project) => {
	let rejectedArticles = project.articles.filter((article) => article.status === 'rejected').map((article) => {
		let voteScore = article.votes.map((vote) => vote.score).reduce((prev, next) => prev + next);
		let averageScore = voteScore * 20 / article.votes.length;
		return `
        <hr>
        <p><strong>Article Title:</strong></p>
        <p>${article.Title}</p>
        <p><strong>Abstract:</strong></p>
        <p>${article.Abstract}</p>
        <button class='btn btn-danger'>Article Score: ${Math.floor(averageScore)} % </button>

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

     


        .btn{
          border-radius: 2px;
border: 1px solid transparent;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
font-size: .825rem;
        }

        .btn-primary{
          color: #ffffff;
background-color: #093fab;
border-color: #093fab;



        }

        .btn-danger{
          color: #ffffff;
background-color: red;
border-color: red;
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
