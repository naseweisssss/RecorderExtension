const fs = require("fs");
let usersjson = fs.readFileSync("users.json","utf-8");
let users = JSON.parse(users.json);


users.push({"id": 111});
usersjson = JSON.stringify(users);
fs.writeFileSync("users.json",usersjson,"utf-8");