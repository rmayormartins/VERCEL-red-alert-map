export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { keywords, region, sources } = req.body;
        const allAlerts = [];

        // ========================================
        // 🔑 API KEYS (Environment Variables)
        // ========================================
        const API_KEYS = {
            NEWSAPI: process.env.NEWSAPI_KEY,
            GNEWS: process.env.GNEWS_KEY,
            CURRENTS: process.env.CURRENTS_API_KEY
        };

        // ========================================
        // 📍 Location Detection
        // ========================================
        const LOCATIONS = {
            'jerusalem': { name: 'Jerusalem', country: 'Israel' },
            'tel aviv': { name: 'Tel Aviv', country: 'Israel' },
            'haifa': { name: 'Haifa', country: 'Israel' },
            'gaza': { name: 'Gaza', country: 'Palestine' },
            'beirut': { name: 'Beirut', country: 'Lebanon' },
            'damascus': { name: 'Damascus', country: 'Syria' },
            'tehran': { name: 'Tehran', country: 'Iran' },
            'baghdad': { name: 'Baghdad', country: 'Iraq' },
            'kabul': { name: 'Kabul', country: 'Afghanistan' },
            'kyiv': { name: 'Kyiv', country: 'Ukraine' },
            'moscow': { name: 'Moscow', country: 'Russia' },
            'cairo': { name: 'Cairo', country: 'Egypt' },
            'riyadh': { name: 'Riyadh', country: 'Saudi Arabia' },
            'ankara': { name: 'Ankara', country: 'Turkey' },
            'london': { name: 'London', country: 'UK' },
            'paris': { name: 'Paris', country: 'France' },
            'berlin': { name: 'Berlin', country: 'Germany' },
            'new york': { name: 'New York', country: 'USA' },
            'washington': { name: 'Washington DC', country: 'USA' }
        };

        // ========================================
        // 📡 NewsAPI Search
        // ========================================
        if (sources.includes('newsapi') && API_KEYS.NEWSAPI) {
            try {
                const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEYS.NEWSAPI}`;
                
                const response = await fetch(newsApiUrl);
                const data = await response.json();
                
                if (data.articles) {
                    const newsAlerts = processArticles(data.articles, 'NewsAPI', LOCATIONS);
                    allAlerts.push(...newsAlerts);
                }
            } catch (error) {
                console.error('NewsAPI error:', error);
            }
        }

        // ========================================
        // 📡 GNews Search
        // ========================================
        if (sources.includes('gnews') && API_KEYS.GNEWS) {
            try {
                const gnewsUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keywords)}&lang=en&max=20&apikey=${API_KEYS.GNEWS}`;
                
                const response = await fetch(gnewsUrl);
                const data = await response.json();
                
                if (data.articles) {
                    const gnewsAlerts = processArticles(data.articles, 'GNews', LOCATIONS);
                    allAlerts.push(...gnewsAlerts);
                }
            } catch (error) {
                console.error('GNews error:', error);
            }
        }

        // ========================================
        // 📡 CurrentsAPI Search
        // ========================================
        if (sources.includes('currents') && API_KEYS.CURRENTS) {
            try {
                const currentsUrl = `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(keywords)}&language=en&apiKey=${API_KEYS.CURRENTS}`;
                
                const response = await fetch(currentsUrl);
                const data = await response.json();
                
                if (data.news) {
                    const currentsAlerts = processArticles(data.news, 'CurrentsAPI', LOCATIONS);
                    allAlerts.push(...currentsAlerts);
                }
            } catch (error) {
                console.error('CurrentsAPI error:', error);
            }
        }

        // Remove duplicates and return
        const uniqueAlerts = removeDuplicates(allAlerts);

        return res.status(200).json({
            alerts: uniqueAlerts,
            total: uniqueAlerts.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('API error:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

// ========================================
// 🔍 Helper Functions
// ========================================

function processArticles(articles, source, locations) {
    const alerts = [];
    
    articles.forEach(article => {
        const text = `${article.title} ${article.description || ''}`;
        const location = extractLocation(text, locations);
        
        if (location) {
            const severity = calculateSeverity(text);
            alerts.push({
                source: source,
                title: article.title,
                description: article.description,
                location: location,
                severity: severity,
                timestamp: new Date().toLocaleTimeString(),
                url: article.url,
                publishedAt: article.publishedAt
            });
        }
    });
    
    return alerts;
}

function extractLocation(text, locations) {
    const textLower = text.toLowerCase();
    
    // Check for known locations
    for (const [key, location] of Object.entries(locations)) {
        if (textLower.includes(key) || textLower.includes(location.name.toLowerCase())) {
            return key;
        }
    }
    
    // Check for country names and return capital
    const countryMap = {
        'israel': 'jerusalem',
        'palestine': 'gaza',
        'lebanon': 'beirut',
        'syria': 'damascus',
        'iran': 'tehran',
        'iraq': 'baghdad',
        'ukraine': 'kyiv',
        'russia': 'moscow'
    };
    
    for (const [country, capital] of Object.entries(countryMap)) {
        if (textLower.includes(country)) {
            return capital;
        }
    }
    
    return null;
}

function calculateSeverity(text) {
    const textLower = text.toLowerCase();
    
    const criticalKeywords = ['explosion', 'bomb', 'missile', 'attack', 'killed', 'dead', 'casualties'];
    const highKeywords = ['siren', 'alert', 'warning', 'evacuate', 'emergency'];
    const mediumKeywords = ['tension', 'threat', 'concern', 'incident'];
    
    if (criticalKeywords.some(keyword => textLower.includes(keyword))) {
        return 'critical';
    } else if (highKeywords.some(keyword => textLower.includes(keyword))) {
        return 'high';
    } else if (mediumKeywords.some(keyword => textLower.includes(keyword))) {
        return 'medium';
    }
    
    return 'low';
}

function removeDuplicates(alerts) {
    const seen = new Set();
    return alerts.filter(alert => {
        const key = `${alert.location}-${alert.title.substring(0, 50)}`;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}
