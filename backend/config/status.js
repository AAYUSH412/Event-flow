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
      --border-radius: 12px;
      --transition: all 0.3s ease;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: var(--text-primary);
      background-color: var(--background);
      padding: 0;
      margin: 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      padding: 4rem 0;
      text-align: center;
      margin-bottom: 3rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    
    header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.8;
    }
    
    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      letter-spacing: -0.025em;
      position: relative;
    }
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: var(--primary);
      font-weight: 600;
    }
    
    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      position: relative;
    }
    
    .card {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 20px rgba(0, 0, 0, 0.03);
      padding: 2.5rem;
      margin-bottom: 2.5rem;
      transition: var(--transition);
      border: 1px solid rgba(229, 231, 235, 0.5);
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07), 0 15px 35px rgba(0, 0, 0, 0.03);
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      transition: var(--transition);
      border-top: 4px solid var(--primary);
      border: 1px solid rgba(229, 231, 235, 0.5);
    }
    
    .route-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(79, 70, 229, 0.1);
    }
    
    .route-card h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
      color: var(--primary);
      font-weight: 600;
    }
    
    .route-card p {
      color: var(--text-secondary);
      font-size: 0.95rem;
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
    }
    
    .badge-success {
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--success);
    }
    
    .badge-warning {
      background-color: rgba(245, 158, 11, 0.1);
      color: var(--warning);
    }
    
    .badge-danger {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--danger);
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
      border-radius: 6px;
      background-color: rgba(79, 70, 229, 0.08);
      transition: all 0.2s;
      text-align: center;
    }
    
    .api-link:hover {
      background-color: rgba(79, 70, 229, 0.15);
      transform: translateY(-2px);
    }
    
    .api-link::after {
      content: '→';
      margin-left: 6px;
      transition: transform 0.2s;
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      border: 1px solid rgba(229, 231, 235, 0.5);
      transition: var(--transition);
    }
    
    .info-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
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
    }
    
    .info-value.connected {
      color: var(--success);
    }
    
    .info-value.disconnected {
      color: var(--danger);
    }
    
    footer {
      text-align: center;
      padding: 3rem 0;
      color: var(--text-secondary);
      font-size: 0.95rem;
      background: linear-gradient(to bottom, var(--background), white);
      margin-top: 2rem;
    }
    
    .footer-links {
      margin-top: 1.25rem;
    }
    
    .footer-links a {
      color: var(--primary);
      text-decoration: none;
      margin: 0 0.75rem;
      transition: color 0.2s;
      position: relative;
    }
    
    .footer-links a:hover {
      color: var(--primary-dark);
    }
    
    .footer-links a::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: var(--primary);
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.3s;
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
    
    .pulse {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--success);
      margin-right: 8px;
      position: relative;
    }
    
    .pulse::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: var(--success);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      70% {
        transform: scale(2);
        opacity: 0;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .container {
        padding: 1.5rem;
      }
      
      header {
        padding: 3rem 0;
      }
      
      h1 {
        font-size: 2.25rem;
      }
      
      .card {
        padding: 1.5rem;
      }
      
      .system-info {
        grid-template-columns: 1fr;
      }
    }
    
    /* Animation for content fade-in */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .card {
      animation: fadeIn 0.6s ease-out forwards;
    }
    
    .card:nth-child(2) {
      animation-delay: 0.2s;
    }
  </style>
</head>
<body>
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