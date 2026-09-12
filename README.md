
## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB database (local or Atlas)
- Cloudinary account
- Gmail account (for sending OTP emails)

### 1. Clone the repository
```bash
git clone https://github.com/Sarfarazahemad9205/Classora.git
cd Classora
```

### 2. Backend setup
```bash
cd server
npm install
```

Create a `.env` file in `server/` with:
```env
PORT=5000
DB=your_mongodb_connection_string
Jwt_secret=your_jwt_secret
Activation_Secret=your_activation_secret
Gmail=your_gmail_address
Password=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the server:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```

The frontend dev server proxies `/api` requests to `http://localhost:5000` (see `vite.config.js`).

## Deployment Notes

- The frontend's `vercel.json` rewrites `/api/*` requests to the Render backend URL, and falls back to `index.html` for all client-side routes (required for React Router to work on direct page loads/refreshes).
- Cloudinary requires **"Allow delivery of PDF and ZIP files"** enabled under Settings → Security for uploaded PDFs to be viewable.
- Render's free tier spins down after inactivity — the first request after idle time may take 30–60 seconds to respond.

## Author

**Sarfaraz Ahemad**
[GitHub](https://github.com/Sarfarazahemad9205)
