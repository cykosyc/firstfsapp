import * as express    from 'express';
import * as mongoose   from 'mongoose';
import * as bodyParser from 'body-parser';
import * as opn        from 'opn';

// import API from backend
import cars            from './routes/api/cars';

const app  = express();
const port = 8080;
const path = require('path');

const connection_string = 'mongodb://nick:98765@ds161159.mlab.com:61159/sampledb_ns';

mongoose.connect(connection_string).then(() => {
  console.log('Successful connection made to ' + connection_string);
}).catch((err) => {
  console.log(connection_string + ' cannot be resolved');
});

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('./www/'));

// mount api
app.use('/v1/api/cars', cars);

app.get('/', (req, res) => {
  res.sendfile(path.resolve('www/views/index.html'));
});

app.get('*', (req, res) => {
  res.sendfile(path.resolve('www/views/404.html'));
});

app.listen(port, () => {
  console.log('listening on port ' + port);
  opn('http://localhost:' + port);
});
