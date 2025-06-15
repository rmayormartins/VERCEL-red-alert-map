# 🚨 RED ALERT MAP

**Real-time Monitoring of Global Security Alerts & Breaking News**

🌐 **Live Demo:** [red-alert-map.vercel.app](https://red-alert-map.vercel.app)

---

## 📋 About

Red Alert Map is a real-time news monitoring system that tracks global security alerts and breaking news from multiple sources. The system displays alerts on an interactive world map with different severity levels and provides live news feeds.

## ✨ Features

- 🗺️ **Interactive World Map** - Visual display of global alerts
- 📰 **Real-time News Feed** - Live updates from multiple news sources
- 🔍 **Smart Filtering** - Keyword and region-based filtering
- 🚨 **Alert Levels** - Critical, High, Medium, and Normal severity indicators
- ⚡ **Auto-refresh** - Continuous monitoring every 2 minutes
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Mapping:** Leaflet.js
- **Deployment:** Vercel Platform
- **APIs:** NewsAPI, GNews, CurrentsAPI

## 🔌 APIs Integrated

- **[NewsAPI](https://newsapi.org/)** - Global news aggregation (1000 requests/day)
- **[GNews](https://gnews.io/)** - Real-time news API (100 requests/day)  
- **[CurrentsAPI](https://currentsapi.services/)** - Breaking news service (600 requests/day)

## 🚀 Deployment

This project is deployed on **[Vercel](https://vercel.com)**, a modern cloud platform for static sites and serverless functions. Vercel provides:

- ⚡ **Edge Network** - Global CDN for fast loading
- 🔄 **Automatic Deployments** - Deploy on every Git push
- 🔒 **Secure Environment** - Built-in security and SSL
- 📊 **Analytics** - Real-time performance monitoring

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/rmayormartins/red-alert-map.git
   cd red-alert-map
   ```

2. **Set up environment variables**
   ```bash
   NEWSAPI_KEY=your_newsapi_key
   GNEWS_KEY=your_gnews_key
   CURRENTS_API_KEY=your_currents_key
   ```

3. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

## 🎯 Monitored Locations

The system monitors key global locations including:

- **Middle East:** Jerusalem, Tel Aviv, Gaza, Beirut, Damascus, Tehran
- **Europe:** London, Paris, Berlin, Moscow, Kyiv
- **Americas:** New York, Washington DC
- **Asia:** Kabul, Baghdad, Cairo, Riyadh, Ankara

## 📊 Alert Severity Levels

- 🔴 **Critical Alert** - Immediate threats and breaking emergencies
- 🟠 **High Alert** - Significant security concerns  
- 🟡 **Medium Alert** - Moderate risk situations
- 🟢 **Normal** - Standard monitoring status

## 🔧 Configuration

The system allows real-time configuration of:

- **Keywords:** Customize search terms (attack, explosion, alert, etc.)
- **Regions:** Focus on specific geographical areas
- **Refresh Rate:** Auto-scan every 2 minutes
- **Alert Thresholds:** Automatic severity classification

## 📱 Usage

1. Visit [red-alert-map.vercel.app](https://red-alert-map.vercel.app)
2. Click **"Test Backend"** to verify API connectivity
3. Click **"Start Monitoring"** to begin real-time tracking
4. Monitor the map for color-coded alerts
5. View detailed news in the live feed panel

## 🔒 Security & Privacy

- No user data collection or tracking
- Secure API key management via Vercel environment variables
- All external requests handled through secure API routes
- No localStorage or cookies used

## 📈 Performance

- **Load Time:** < 2 seconds
- **API Response:** < 1 second average
- **Real-time Updates:** Every 120 seconds
- **Mobile Optimized:** Responsive design for all devices

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests. All contributions are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

**Ramon Mayor Martins, PhD.**  
Telecommunication Area - Federal Institute of Santa Catarina, Brazil  

📧 **Contact:** [ramon.mayor@ifsc.edu.br](mailto:ramon.mayor@ifsc.edu.br)  
🌐 **Website:** [rmayormartins.github.io](https://rmayormartins.github.io)  
📅 **Year:** 2025

---

## 🙏 Acknowledgments

- **Leaflet.js** for the interactive mapping library
- **NewsAPI, GNews, CurrentsAPI** for news data
- **Vercel** for hosting and deployment platform
- **OpenStreetMap** contributors for map data

---

**⭐ If you find this project useful, please consider giving it a star!**
