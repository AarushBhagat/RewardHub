const fs = require('fs');
const path = require('path');

const replacements = [
  { old: "Aarush", new: "surinder kumar", avatar: "surinder+kumar" },
  { old: "Monalisha", new: "Tawlinder singh", avatar: "Tawlinder+singh" },
  { old: "Abhisht", new: "Rajeev", avatar: "Rajeev" },
  { old: "Harshit Sharma", new: "Priya", avatar: "Priya" },
  { old: "Yug", new: "Vishal kumar", avatar: "Vishal+kumar" },
  { old: "Priya", new: "Rohit Kumar Sharma", avatar: "Rohit+Kumar+Sharma" },
  { old: "Kunal", new: "Prateek Sharma", avatar: "Prateek+Sharma" },
  { old: "Riya", new: "Ashwani Kumar", avatar: "Ashwani+Kumar" },
  { old: "Dev", new: "Jhanvi Arora", avatar: "Jhanvi+Arora" },
  { old: "Sneha", new: "Rajath Kumar", avatar: "Rajath+Kumar" }
];

const filesToProcess = [
  path.join(__dirname, 'src', 'data', 'users.js'),
  path.join(__dirname, 'src', 'data', 'performance.js')
];

for (const file of filesToProcess) {
  let content = fs.readFileSync(file, 'utf8');
  for (const r of replacements) {
    // Replace names
    content = content.replace(new RegExp(`"name": "${r.old}"`, 'g'), `"name": "${r.new}"`);
    // For users.js avatar replacement
    content = content.replace(new RegExp(`name=${r.old.replace(' ', '\\+')}(&|")`, 'g'), `name=${r.avatar}$1`);
  }
  // Let's also do a blanket replace for "Aarush Bhagat" in case it appears, though it's only in Performance.jsx which we handle separately
  fs.writeFileSync(file, content, 'utf8');
  console.log('Processed', file);
}
