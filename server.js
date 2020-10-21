var express = require('express');
var app = express();
app.use(express.static('./dist/ng-select-dropdown'));
app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/ng-select-dropdown/'}),
);
app.listen(process.env.PORT || 8080);