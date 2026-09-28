import express from 'express';
import { connectToDatabase } from './config/database.js';
import apiRouter from './routes/index.js';
const app = express();
const port = 8000;
app.use(express.json());
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
});
app.use('/api', apiRouter);
app.use((error, _request, response, _next) => {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
        response.status(400).json({ error: error.message });
        return;
    }
    if (error.code === 11000) {
        response.status(409).json({ error: 'A record with that unique value already exists' });
        return;
    }
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
});
async function startServer() {
    await connectToDatabase();
    app.listen(port, '0.0.0.0', () => {
        const codespaceName = process.env.CODESPACE_NAME;
        const baseUrl = codespaceName
            ? `https://${codespaceName}-8000.app.github.dev`
            : 'http://localhost:8000';
        console.log(`OctoFit API listening at ${baseUrl}`);
    });
}
startServer().catch((error) => {
    console.error('Unable to start OctoFit API:', error);
    process.exit(1);
});
