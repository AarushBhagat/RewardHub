import fs from 'fs';
const file = 'src/pages/admin/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// The file has escaped backticks like \` which breaks JSX. We want `
content = content.replace(/\\`/g, '`');

fs.writeFileSync(file, content);
console.log('Fixed backticks');
