let express = require("express");
let app = express();

app.get("/film", require("./src/film"));
app.get("/search/:query",require("./src/search"));
app.get("/promises/film", require("./src/film-promise"));
app.get("/promises/search/:query", require("./src/search-promise"));

app.listen(8081, () => console.log('\n Server running at http://localhost:8081/ \n'));