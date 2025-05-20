export default `
<!DOCTYPE html>
<html lang="en">
<head>  
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EventFlow API | Documentation</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #4F46E5;
      --primary-dark: #4338CA;
      --primary-light: #818CF8;
      --secondary: #8B5CF6;
      --secondary-light: #A78BFA;
      --light: #F3F4F6;
      --dark: #1F2937;
      --success: #10B981;
      --warning: #F59E0B;
      --danger: #EF4444;
      --background: #F9FAFB;
      --text-primary: #1F2937;
      --text-secondary: #6B7280;
      --border-radius: 16px;
      --transition: all 0.3s cubic-bezier(.4,0,.2,1);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: var(--text-primary);
      background: linear-gradient(120deg, #f3f4f6 0%, #f9fafb 100%);
      min-height: 100vh;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      position: relative;
    }
    .animated-bg {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background: radial-gradient(ellipse at 60% 0%, #6366f1 0%, transparent 70%), 
                  radial-gradient(ellipse at 10% 80%, #a78bfa 0%, transparent 70%);
      opacity: 0.12;
      animation: bgMove 18s linear infinite alternate;
    }
    @keyframes bgMove {
      0% { background-position: 60% 0%, 10% 80%; }
      100% { background-position: 40% 20%, 30% 60%; }
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    header {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      padding: 4rem 0 3rem 0;
      text-align: center;
      margin-bottom: 3rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      position: relative;
      overflow: hidden;
      border-radius: 0 0 32px 32px;
      animation: fadeInDown 1s cubic-bezier(.4,0,.2,1);
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-40px);}
      to { opacity: 1; transform: translateY(0);}
    }
    header::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.7;
      animation: bgFade 10s ease-in-out infinite alternate;
    }
    @keyframes bgFade {
      0% { opacity: 0.7; }
      100% { opacity: 0.9; }
    }
    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      letter-spacing: -0.025em;
      position: relative;
      background: linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      animation: gradientMove 6s linear infinite alternate;
    }
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: var(--primary);
      font-weight: 600;
      letter-spacing: -0.01em;
      animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1);
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px);}
      to { opacity: 1; transform: translateY(0);}
    }
    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      position: relative;
      margin-bottom: 0.5rem;
      animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1) 0.2s;
    }
    .card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: 0 4px 16px rgba(99,102,241,0.08), 0 10px 20px rgba(0,0,0,0.03);
      padding: 2.5rem;
      margin-bottom: 2.5rem;
      transition: var(--transition);
      border: 1px solid rgba(229, 231, 235, 0.5);
      animation: fadeInCard 0.7s cubic-bezier(.4,0,.2,1);
      position: relative;
      overflow: hidden;
    }
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(40px);}
      to { opacity: 1; transform: translateY(0);}
    }
    .card::before {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 180px; height: 180px;
      background: radial-gradient(circle, #6366f1 0%, transparent 80%);
      opacity: 0.08;
      z-index: 0;
      pointer-events: none;
      animation: float 6s ease-in-out infinite alternate;
    }
    @keyframes float {
      0% { transform: translateY(0);}
      100% { transform: translateY(20px);}
    }
    .routes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .route-card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 8px rgba(139,92,246,0.07);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      transition: var(--transition);
      border-top: 4px solid var(--primary);
      border: 1px solid rgba(229, 231, 235, 0.5);
      position: relative;
      overflow: hidden;
      animation: fadeInCard 0.8s cubic-bezier(.4,0,.2,1);
    }
    .route-card:hover {
      transform: translateY(-7px) scale(1.03);
      box-shadow: 0 10px 30px rgba(99,102,241,0.13);
      border-top: 4px solid var(--secondary);
    }
    .route-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      color: var(--primary);
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .route-card p {
      color: var(--text-secondary);
      font-size: 0.98rem;
      flex-grow: 1;
      margin-bottom: 1.25rem;
      line-height: 1.5;
    }
    .badge {
      display: inline-block;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.7rem;
      margin-right: auto;
      animation: pulseBadge 2.5s infinite alternate;
    }
    @keyframes pulseBadge {
      0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.12);}
      100% { box-shadow: 0 0 0 8px rgba(139,92,246,0.08);}
    }
    .badge-success {
      background: linear-gradient(90deg, #10B981 0%, #34D399 100%);
      color: white;
      border: none;
    }
    .badge-warning {
      background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%);
      color: white;
      border: none;
    }
    .badge-danger {
      background: linear-gradient(90deg, #EF4444 0%, #F87171 100%);
      color: white;
      border: none;
    }
    .api-link {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1rem;
      text-decoration: none;
      color: var(--primary);
      font-weight: 500;
      padding: 0.65rem 1.25rem;
      border-radius: 8px;
      background: linear-gradient(90deg, #f3f4f6 0%, #e0e7ff 100%);
      transition: all 0.2s;
      text-align: center;
      box-shadow: 0 2px 8px rgba(99,102,241,0.04);
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    .api-link:hover {
      background: linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%);
      color: white;
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 6px 18px rgba(99,102,241,0.13);
    }
    .api-link::after {
      content: '→';
      margin-left: 6px;
      transition: transform 0.2s;
      font-weight: bold;
    }
    .api-link:hover::after {
      transform: translateX(3px);
    }
    .system-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    .info-item {
      background-color: white;
      padding: 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: 0 2px 8px rgba(99,102,241,0.05);
      border: 1px solid rgba(229, 231, 235, 0.5);
      transition: var(--transition);
      position: relative;
      overflow: hidden;
      animation: fadeInCard 0.7s cubic-bezier(.4,0,.2,1);
    }
    .info-item:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 24px rgba(99,102,241,0.09);
    }
    .info-label {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    .info-value {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      letter-spacing: 0.01em;
    }
    .info-value.connected {
      color: var(--success);
      animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1);
    }
    .info-value.disconnected {
      color: var(--danger);
      animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1);
    }
    .pulse {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--success);
      margin-right: 8px;
      position: relative;
      box-shadow: 0 0 0 0 rgba(16,185,129,0.5);
      animation: pulseDot 1.5s infinite cubic-bezier(.4,0,.2,1);
    }
    @keyframes pulseDot {
      0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5);}
      70% { box-shadow: 0 0 0 8px rgba(16,185,129,0);}
      100% { box-shadow: 0 0 0 0 rgba(16,185,129,0);}
    }
    footer {
      text-align: center;
      padding: 3rem 0 2rem 0;
      color: var(--text-secondary);
      font-size: 0.98rem;
      background: linear-gradient(to bottom, var(--background), white);
      margin-top: 2rem;
      border-radius: 32px 32px 0 0;
      animation: fadeInUp 1.2s cubic-bezier(.4,0,.2,1);
    }
    .footer-links {
      margin-top: 1.25rem;
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .footer-links a {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
      position: relative;
      transition: color 0.2s;
      padding-bottom: 2px;
    }
    .footer-links a:hover {
      color: var(--primary-dark);
    }
    .footer-links a::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -2px;
      left: 0;
      background: linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%);
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s;
      border-radius: 2px;
    }
    .footer-links a:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    .copyright {
      opacity: 0.8;
      margin-bottom: 1rem;
    }
    .health-link {
      color: var(--primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .health-link:hover {
      color: var(--primary-dark);
      text-decoration: underline;
    }
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .container { padding: 1.5rem; }
      header { padding: 2.5rem 0 2rem 0; }
      h1 { font-size: 2.25rem; }
      .card { padding: 1.2rem; }
      .system-info { grid-template-columns: 1fr; }
      .routes { grid-template-columns: 1fr; }
      footer { padding: 2rem 0 1.5rem 0; }
    }
  </style>
</head>
<body>
  <div class="animated-bg"></div>
  <header>
    <div class="container">
      <h1>EventFlow API</h1>
      <p class="subtitle">A comprehensive event management system for campus events</p>
    </div>
  </header>
  <div class="container">
    <div class="card">
      <h2>System Status</h2>
      <div class="system-info">
        <div class="info-item">
          <div class="info-label">MongoDB Status</div>
          <div class="info-value ${(function() { 
            return '{{MONGODB_STATUS}}' === 'Connected' ? 'connected' : 'disconnected';
          })()}">
            ${(function() { 
              return '{{MONGODB_STATUS}}' === 'Connected' ? '<span class="pulse"></span>' : '';
            })()}
            {{MONGODB_STATUS}}
          </div>
        </div>
        <div class="info-item">
          <div class="info-label">Server Port</div>
          <div class="info-value">{{PORT}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Environment</div>
          <div class="info-value">{{NODE_ENV}}</div>
        </div>
        <div class="info-item">
          <div class="info-label">API URL</div>
          <div class="info-value">{{API_URL}}</div>
        </div>
      </div>
      <h2>API Endpoints</h2>
      <div class="routes">
        <div class="route-card">
          <h3>Authentication</h3>
          <p>User registration, login, and authentication management</p>
          <span class="badge badge-success">POST</span>
          <a href="/api/auth" class="api-link">Explore Auth API</a>
        </div>
        <div class="route-card">
          <h3>Events</h3>
          <p>Create, manage, and discover campus events</p>
          <span class="badge badge-success">CRUD</span>
          <a href="/api/events" class="api-link">Explore Events API</a>
        </div>
        <div class="route-card">
          <h3>Registrations</h3>
          <p>Manage event registrations and attendee lists</p>
          <span class="badge badge-warning">Multi-Resource</span>
          <a href="/api/registrations" class="api-link">Explore Registrations API</a>
        </div>
        <div class="route-card">
          <h3>Certificates</h3>
          <p>Generate and manage event participation certificates</p>
          <span class="badge badge-warning">Service</span>
          <a href="/api/certificates" class="api-link">Explore Certificates API</a>
        </div>
      </div>
    </div>
    <div class="card">
      <h2>Health Check</h2>
      <p>You can check the API health status at any time by visiting <a href="/api/health" class="health-link">/api/health</a></p>
    </div>
  </div>
  <footer>
    <div class="container">
      <p class="copyright">EventFlow API &copy; ${new Date().getFullYear()}</p>
      <p>Frontend URL: <a href="{{FRONTEND_URL}}">{{FRONTEND_URL}}</a></p>
      <div class="footer-links">
        <a href="/api/docs">API Documentation</a>
        <a href="https://github.com/AAYUSH412/eventflow" target="_blank">GitHub</a>
        <a href="mailto:support@eventflow.example.com">Support</a>
      </div>
    </div>
  </footer>
</body>
</html>
`;