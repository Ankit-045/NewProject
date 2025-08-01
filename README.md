# WanderLust

## Overview
WanderLust is a web application built with Node.js and Express.js that allows users to create and browse listings, post reviews, and manage user authentication. The app uses MongoDB for data storage and Cloudinary for image uploads. The frontend is rendered using EJS templates with support for layouts via ejs-mate.

## Features
- User registration and authentication with Passport.js
- Create, edit, and view listings
- Post reviews on listings
- Image uploads handled via Cloudinary
- Session management with MongoDB-backed sessions
- Flash messages for user feedback
- Responsive UI using EJS templating

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd majorproject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   ATLASDB_URL=<Your MongoDB Atlas connection string>
   SECRET=<Your session secret>
   CLOUD_NAME=<Your Cloudinary cloud name>
   CLOUD_API_KEY=<Your Cloudinary API key>
   CLOUD_API_SECRET=<Your Cloudinary API secret>
   NODE_ENV=development
   ```

## Usage

Start the server with:

```bash
node app.js
```

The application will be accessible at `http://localhost:3000`.

## Project Structure

- `app.js` - Main application entry point and server setup
- `controllers/` - Route controllers for listings, reviews, and users
- `models/` - Mongoose models for listings, reviews, and users
- `routes/` - Express route definitions
- `views/` - EJS templates for rendering frontend pages
- `public/` - Static assets (CSS, JavaScript, images)
- `utils/` - Utility modules including custom error handling and async wrapper
- `cloudConfig.js` - Cloudinary configuration for image uploads
- `init/` - Initialization scripts and data seeding (if any)

## Configuration

The app requires the following environment variables to be set in a `.env` file:

- `ATLASDB_URL`: MongoDB connection string for the database
- `SECRET`: Secret key for session encryption
- `CLOUD_NAME`: Cloudinary cloud name for image storage
- `CLOUD_API_KEY`: Cloudinary API key
- `CLOUD_API_SECRET`: Cloudinary API secret
- `NODE_ENV`: Set to `production` or `development`

## Dependencies

Key dependencies used in this project include:

- express
- mongoose
- ejs and ejs-mate
- passport and passport-local-mongoose
- multer and multer-storage-cloudinary
- cloudinary
- connect-mongo and express-session
- joi for validation
- method-override
- connect-flash

## License

This project is licensed under the ISC License.
