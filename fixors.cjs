const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminDashboard.jsx', 'utf8');

// Fix employeeTotals[item.name] ; 0
content = content.replace(/employeeTotals\\[item.name\\] ; 0/g, 'employeeTotals[item.name] || 0');

// Fix matchDept = selectedDept === 'All' ; item.dept === selectedDept
content = content.replace(/selectedDept === 'All' ; item\.dept/g, "selectedDept === 'All' || item.dept");
content = content.replace(/selectedMonth === 'All' ; item\.date/g, "selectedMonth === 'All' || item.date");
content = content.replace(/rewardTypeFilter === 'All' ; item\.type/g, "rewardTypeFilter === 'All' || item.type");
content = content.replace(/matchSearch = item\.name\[.*\] ; /g, ""); 
content = content.replace(/toLowerCase\(\)(\s*);(\s*)item/g, "toLowerCase() || item");

// Fix (months[month] ; 0)
content = content.replace(/\(months\\[month\\] ; 0\)/g, "(months[month] || 0)");

// Fix (types[r.type] ; 0)
content = content.replace(/\(types\\[r\.type\\] ; 0\)/g, "(types[r.type] || 0)");

// Fix (totals[r.name] ; 0)
content = content.replace(/\(totals\\[r\.name\\] ; 0\)/g, "(totals[r.name] || 0)");

// Fix (topEmployeesData[0]\?.total ; 1)
content = content.replace(/\(topEmployeesData\\[0\\]\?\.total ; 1\)/g, "(topEmployeesData[0]?.total || 1)");

fs.writeFileSync('src/pages/admin/AdminDashboard.jsx', content);
console.log('Fixed logical ORs');
