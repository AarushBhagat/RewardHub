const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace $ followed by numbers -> ₹ followed by numbers
      content = content.replace(/\$(\d+)/g, '₹$1');
      
      // Replace $${ -> ₹${
      content = content.replace(/\$\$\{/g, '₹${');

      // EmployeeDashboard.jsx specific:
      // $<AnimatedCounter
      content = content.replace(/\$<AnimatedCounter/g, '₹<AnimatedCounter');

      // AdminDashboard.jsx specific:
      // DollarSign -> IndianRupee
      if (fullPath.endsWith('AdminDashboard.jsx')) {
        content = content.replace(/DollarSign/g, 'IndianRupee');
      }

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

replaceInDir(path.join(__dirname, 'src'));
