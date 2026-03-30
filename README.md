# Spotify Backend

A RESTful API backend for a Spotify-like music streaming application built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login) with JWT
- Role-based access control (user/artist)
- Music upload and management
- Album creation and management
- File storage with ImageKit
- Secure password hashing with bcrypt

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Storage**: ImageKit
- **Security**: bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- ImageKit account for file storage

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd spotify-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "user" | "artist" (optional, defaults to "user")
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string" (or email),
  "email": "string" (or username),
  "password": "string"
}
```

Returns a JWT token in a cookie and response body.

### Music

#### Upload Music (Artist Only)
```http
POST /api/music/upload
Authorization: Bearer <token> (or Cookie)
Content-Type: multipart/form-data

Fields:
- music: file (audio file)
- title: string
```

#### Get All Music
```http
GET /api/music/
```

Returns a list of all music tracks.

#### Create Album (Artist Only)
```http
POST /api/music/album
Authorization: Bearer <token> (or Cookie)
Content-Type: multipart/form-data

Fields:
- album: file (optional)
- title: string
- musicId: string (ID of music track)
```

### Album

#### Create Album (Artist Only)
```http
POST /api/album/album
Authorization: Bearer <token> (or Cookie)
Content-Type: multipart/form-data

Fields:
- album: file (optional)
- title: string
- musicId: string
```

## Authentication

The API supports two authentication methods:

1. **Cookie-based**: Token is automatically sent in cookies after login
2. **Header-based**: Include token in Authorization header:
   ```
   Authorization: Bearer <your_token>
   ```

## User Roles

- **user**: Can browse and listen to music
- **artist**: Can upload music and create albums (includes all user permissions)

## Project Structure

```
spotify-backend/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── auth.controller.js
│   │   ├── music.controller.js
│   │   └── album.controller.js
│   ├── models/          # Database schemas
│   │   ├── user.model.js
│   │   ├── music.model.js
│   │   └── album.model.js
│   ├── routes/          # API routes
│   │   ├── auth.routes.js
│   │   ├── music.routes.js
│   │   └── album.routes.js
│   ├── middlewares/     # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   ├── services/        # External services
│   │   └── storage.services.js
│   ├── db/             # Database connection
│   │   └── db.js
│   └── app.js          # Express app setup
├── server.js           # Server entry point
├── .env               # Environment variables (not in git)
├── .gitignore
├── package.json
└── README.md
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict (e.g., user already exists)
- `500`: Internal Server Error

## Security

- Passwords are hashed using bcrypt with salt rounds of 15
- JWT tokens are used for authentication
- Protected routes require valid authentication
- Role-based access control for artist-only endpoints

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

## Testing

Test the API using tools like:
- Postman
- Thunder Client
- cURL

Example cURL request:
```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

ISC

## Author

Your Name

## Support

For issues and questions, please open an issue on GitHub.
