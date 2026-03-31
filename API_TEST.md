# API Testing Guide

Use this guide to test all endpoints. You can use Postman, Thunder Client, or cURL.

## 1. Register User (Artist)

**Endpoint**: `POST /api/auth/register`

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "artist1",
    "email": "artist@example.com",
    "password": "password123",
    "role": "artist"
  }'
```

**Expected Response** (201):
```json
{
  "message": "user registration successfully",
  "user": {
    "id": "user_id",
    "role": "artist"
  }
}
```

---

## 2. Register User (Regular User)

**Endpoint**: `POST /api/auth/register`

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

## 3. Login User

**Endpoint**: `POST /api/auth/login`

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "artist1",
    "password": "password123"
  }'
```

**Expected Response** (200):
```json
{
  "message": "login successful",
  "user": {
    "id": "user_id",
    "role": "artist"
  }
}
```

**Save the token from the response for next requests**

---

## 4. Get All Music

**Endpoint**: `GET /api/music/`

```bash
curl http://localhost:3000/api/music/
```

**Expected Response** (200):
```json
{
  "message": "All music fetched successfully",
  "musics": []
}
```

---

## 5. Upload Music (Artist Only)

**Endpoint**: `POST /api/music/upload`

**Requirements**: 
- Must be logged in as artist
- Must include Authorization header or cookie

```bash
curl -X POST http://localhost:3000/api/music/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "music=@/path/to/audio.mp3" \
  -F "title=My First Song"
```

**Expected Response** (201):
```json
{
  "message": "music created successfully",
  "music": {
    "id": "music_id",
    "uri": "imagekit_url",
    "title": "My First Song",
    "artist": "artist_id"
  }
}
```

---

## 6. Create Album (Artist Only)

**Endpoint**: `POST /api/music/album`

**Requirements**:
- Must be logged in as artist
- Must include Authorization header or cookie
- Need a valid musicId from uploaded music

```bash
curl -X POST http://localhost:3000/api/music/album \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Album",
    "musicId": "MUSIC_ID_FROM_UPLOAD"
  }'
```

**Expected Response** (201):
```json
{
  "message": "album created successfully",
  "album": {
    "id": "album_id",
    "title": "My Album",
    "artist": "artist_id",
    "musics": ["music_id"]
  }
}
```

---

## Testing Workflow

### Step 1: Start Server
```bash
npm run dev
```

### Step 2: Register Artist
Use endpoint #1 to create an artist account

### Step 3: Login
Use endpoint #3 to login and get token

### Step 4: Get All Music
Use endpoint #4 (should be empty initially)

### Step 5: Upload Music
Use endpoint #5 with your token and an audio file
- Save the returned `music_id`

### Step 6: Get All Music Again
Use endpoint #4 (should now show your uploaded music)

### Step 7: Create Album
Use endpoint #6 with the `music_id` from step 5

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Invalid access — use Cookie token from login or header: Authorization: Bearer <token>"
}
```

### 403 Forbidden (Non-Artist)
```json
{
  "message": "you dont have access to create music"
}
```

### 409 Conflict (User Exists)
```json
{
  "message": "user already exist"
}
```

### 400 Bad Request
```json
{
  "message": "music file is required (form field name: music)"
}
```

---

## Using Postman

1. Create a new collection
2. Add requests for each endpoint
3. For file upload:
   - Set method to POST
   - Go to Body → form-data
   - Add key `music` with type `File`
   - Add key `title` with type `Text`
4. For authentication:
   - Go to Headers
   - Add `Authorization: Bearer YOUR_TOKEN`

---

## Notes

- All timestamps are in ISO format
- Passwords are hashed with bcrypt (salt rounds: 15)
- JWT tokens expire based on your JWT_SECRET configuration
- File uploads are stored on ImageKit
- Only artists can upload music and create albums
