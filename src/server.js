const express = require('express');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
  request('https://raw.githubusercontent.com/hyperplayer7/jsonresume/main/resume.json', (error, response, body) => {
    if (error) {
      res.send(error.message);
    } else {
      const data = JSON.parse(body);
      const name = data.basics.name;
      const summary = data.basics.summary;
      const email = data.basics.email;
      const profiles = data.basics.profiles;
      const projects = data.projects;
      const skills = data.skills;
      const work = data.work;
      
      let html = `
        <html>
          <head>
            <title>${name} - Resume</title>
          </head>
          <body>
            <h1>${name}</h1>
            <p>${summary}</p>
            <p>Email: ${email}</p>
            <h2>Profiles</h2>
            <ul>
      `;
      for (const profile of profiles) {
        html += `<li>${profile.network}: ${profile.url}</li>`;
      }
      html += `
            </ul>
            <h2>Projects</h2>
            <ul>
      `;
      for (const project of projects) {
        html += `<li><a href="${project.url}">${project.name}</a></li>`;
      }
      html += `
            </ul>
            <h2>Skills</h2>
            <ul>
      `;
      for (const skill of skills) {
        html += `<li>${skill.name}: ${skill.keywords.join(', ')}</li>`;
      }
      html += `
            </ul>
            <h2>Work Experience</h2>
      `;
      for (const job of work) {
        html += `
          <h3>${job.position} at ${job.name}</h3>
          <p>${job.startDate} - ${job.endDate}</p>
        `;
        for (const highlight of job.highlights) {
          html += `<p>${highlight}</p>`;
        }
      }
      html += `
          </body>
        </html>
      `;
      
      res.send(html);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});