import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

// Connect to MongoDB. Program exits if connection doesn't success
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});

const app = express();
const port = 8000;

// Serve static files first, then look at api-related stuff
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));