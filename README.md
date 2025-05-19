<div align="center">

<img src="frontend/public/logo.svg" alt="EventFlow Logo" width="250" />

# ✨ EventFlow ✨

### *Transform Your Events into Unforgettable Experiences*

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)
[![Made with Love](https://img.shields.io/badge/Made%20With-♥-ff69b4.svg?style=for-the-badge)](https://github.com/yourusername)

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-api-reference">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>


## 🌟 Overview

**EventFlow** transforms how events are managed through modern technology and intuitive design:

## 💫 Key Features

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Advanced User Authentication</h3>
      <ul>
        <li>Role-based access control (Admin/Organizer/Attendee)</li>
        <li>OAuth integration with popular providers</li>
        <li>Two-factor authentication support</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🗓️ Event Management</h3>
      <ul>
        <li>Visual event builder with templates</li>
        <li>Multi-track session management</li>
        <li>Speaker and sponsor showcase</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <h3>🎟️ Registration System</h3>
      <ul>
        <li>Customizable registration forms</li>
        <li>Payment processing integration</li>
        <li>QR code ticket generation</li>
      </ul>
    </td>
    <td>
      <h3>🏅 Certificate Generation</h3>
      <ul>
        <li>Custom certificate templates</li>
        <li>Automated distribution</li>
        <li>Blockchain verification (coming soon)</li>
      </ul>
    </td>
  </tr>
</table>

## 💻 Tech Stack

<div align="center">
  
### Backend
  
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />

### Frontend
  
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />

</div>

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/EventFlow.git
cd EventFlow

# Install backend dependencies
cd backend
npm install

# Create .env.local file with your environment variables
cp .env.example .env.local

# Edit the .env.local file with your configuration
nano .env.local

# Start the development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

## 🌐 Environment Variables

### Backend (.env.local)

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/eventflow
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:4000
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 📡 API Reference

Our extensively documented API endpoints:

<details>
<summary><b>🔑 Authentication</b></summary>

```http
POST /api/auth/register - Register a new user
POST /api/auth/login - Login existing user
POST /api/auth/forgot-password - Password reset flow
```

</details>

<details>
<summary><b>🎪 Events</b></summary>

```http
GET /api/events - List all public events
GET /api/events/:id - Get event details
POST /api/events - Create event (Auth required)
PUT /api/events/:id - Update event (Auth required)
DELETE /api/events/:id - Delete event (Auth required)
```

</details>

<details>
<summary><b>📝 Registrations</b></summary>

```http
GET /api/registrations - Get user registrations
POST /api/registrations - Register for an event
GET /api/registrations/:id - Registration details
```

</details>

<details>
<summary><b>🎓 Certificates</b></summary>

```http
GET /api/certificates/:id - Download certificate
POST /api/certificates/generate - Generate certificate
```

</details>

<details>
<summary><b>👩‍💼 Admin</b></summary>

```http
GET /api/admin/users - List all platform users
PUT /api/admin/users/:id - Update user information
DELETE /api/admin/users/:id - Delete user account
```

</details>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We love contributions! Here's how you can help:

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <img src="frontend/public/logo.svg" alt="EventFlow Logo" width="80" />
  <p>
    <sub>Built with ❤️ by the EventFlow Team</sub>
  </p>
  
  <a href="https://twitter.com/your_twitter_handle">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
  </a>
  <a href="https://discord.gg/your_discord">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />
  </a>
</div>