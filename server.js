const { connect } = require('mongoose');
const app = require('./src/app');
const connectDB = require('./src/db/db')
const port = 3000;
connectDB();

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})