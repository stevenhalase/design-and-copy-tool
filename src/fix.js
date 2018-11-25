const mockData = require('./MOCK_DATA.json');

for (let project of mockData.projects) {
  for (let item of project.items) {
    for (let revision of item.revisions) {
      for (let comment of revision.comments) {
        if (comment.type.name === 'COMMENT') {
          const labels = [
            { name: 'SUGGESTION' },
            { name: 'QUESTION' }
          ];
          var randomNumber = Math.floor(Math.random()*labels.length);
          const label = labels[randomNumber];
          comment.labels = [label];
        }
      }
    }
  }
}

const fs = require('fs');
const content = JSON.stringify(mockData);

fs.writeFile('./MOCK_DATA_FIX1.json', content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 