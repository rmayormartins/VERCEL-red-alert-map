export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const apiStatus = [];
        
        // Check which APIs are configured
        if (process.env.NEWSAPI_KEY) {
            apiStatus.push({ name: 'NewsAPI', status: '✅ Configured' });
        } else {
            apiStatus.push({ name: 'NewsAPI', status: '❌ Missing API Key' });
        }
        
        if (process.env.GNEWS_KEY) {
            apiStatus.push({ name: 'GNews', status: '✅ Configured' });
        } else {
            apiStatus.push({ name: 'GNews', status: '❌ Missing API Key' });
        }
        
        if (process.env.CURRENTS_API_KEY) {
            apiStatus.push({ name: 'CurrentsAPI', status: '✅ Configured' });
        } else {
            apiStatus.push({ name: 'CurrentsAPI', status: '❌ Missing API Key' });
        }

        return res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            apis: apiStatus,
            environment: 'production',
            platform: 'Vercel'
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Health check failed',
            message: error.message
        });
    }
}
