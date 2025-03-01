# Postaway API  
*A social media API for creating and managing posts and comments.*  

## Features  
✅ User authentication (JWT)  
✅ Create, read, update, and delete posts  
✅ Commenting system  
✅ User profile management  
✅ Schema validation with Mongoose  
✅ API documentation with Swagger  

## Tech Stack  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ORM)  
- **Authentication:** JWT  
- **File Uploads:** Cloudinary, express-fileupload  
- **Validation:** Mongoose built-in validation  
- **Documentation:** Swagger  

## Installation  
```sh
git clone https://github.com/ForkedByCode/postaway.git
cd postaway
npm install
```

## Environment Variables  
Create a `.env` file and set up:  
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Server  
```sh
npm start
```
or
```sh
nodemon index.js
```

## API Documentation  
Once running, access Swagger docs at:  
```
http://localhost:5000/api-docs
```

## Contributing  
Feel free to fork the repo and submit pull requests!  

---
