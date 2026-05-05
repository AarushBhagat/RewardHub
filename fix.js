import fs from 'fs';
const file = 'src/pages/admin/AdminDashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\\\$\\\$/g, '$');
content = content.replace(/\\\$\\\\\\\\{/g, '${');

fs.writeFileSync(file, content);
console.log('Fixed file');
