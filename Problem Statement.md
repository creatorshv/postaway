### Extracted Text:

#### **Objective**
Develop a robust social media backend REST-API that empowers users to post, comment, like, send friend requests, and reset their passwords using OTP for enhanced security.

---

### **Acceptance Criteria**
#### **RESTful Architecture**
- Develop a RESTful API using Node.js, ExpressJS, and MongoDB for efficient data handling and routing control.

#### **Code Modularity**
- Organize code using ES6 Modules for maintainability and modularity.

#### **User Authentication**
- Implement user authentication with signup, login, and logout.
- Extra feature: Allow users to log out from all devices by storing login tokens in an array field in the user document.
- Registration fields: name, email, password, gender, and additional fields if needed.

#### **Post Management**
- CRUD operations for posts with caption and image URL.
- Each post should reference the creator.
- Only the post owner can update or delete their post.

#### **Comment System**
- Users can add, update, and delete comments on posts.
- Only the post owner or the commenter can update/delete comments.

#### **Like Functionality**
- Implement like system with MongoDB document population.
- Display counts of likes and comments on posts.
- Populate user info (id, name, email) for likes, comments, and posts.

#### **Friendship Features**
- Implement a friendship system with user friends, pending requests, toggling friendships, and accepting/rejecting requests.

#### **User Profile Updates**
- Allow users to update their name, gender, or avatar.
- Enable avatar uploads.

#### **OTP-Based Password Reset (Additional Task)**
- OTP-based password reset feature.
- Create controllers, models, and repositories for OTP management.
- Use Nodemailer for email communication.

---

### **Tasks**
#### **Project Setup**
- Set up an Express.js application.

#### **Dependency Installation**
- Install required dependencies.

#### **User Authentication**
- Implement user registration, login, and logout routes.

#### **User Profile**
- Routes for getting and updating user details.
- Implement avatar uploads.

#### **Post Management**
- CRUD operations for posts.
- Handle image uploads.

#### **Comment System**
- Develop routes for managing comments.

#### **Like Functionality**
- Create like/unlike routes.

#### **Friendship Features**
- Implement routes for user friendships.

#### **OTP-Based Password Reset**
- Implement routes for OTP-based password reset.

#### **Error Handling and Logging**
- Add middleware for error handling and request logging.

#### **Testing and Documentation**
- Test the API and document its functionalities.

---

### **API Structure**
#### **Authentication Routes**
- `POST /api/users/signup` → Register a new user.
- `POST /api/users/signin` → Log in a user.
- `POST /api/users/logout` → Log out the user.
- `POST /api/users/logout-all-devices` → Log out from all devices.

#### **User Profile Routes**
- `GET /api/users/get-details/:userId` → Get user info (excluding passwords).
- `GET /api/users/get-all-details` → Get details of all users.
- `PUT /api/users/update-details/:userId` → Update user details.

#### **Post Routes**
- `GET /api/posts/all` → Get all posts (news feed).
- `GET /api/posts/:postId` → Get a specific post.
- `GET /api/posts/:` → Get all posts for a user.
- `POST /api/posts/` → Create a post.
- `DELETE /api/posts/:postId` → Delete a post.
- `PUT /api/posts/:postId` → Update a post.

#### **Comment Routes**
- `GET /api/comments/:postId` → Get comments for a post.
- `POST /api/comments/:postId` → Add a comment.
- `DELETE /api/comments/:commentId` → Delete a comment.
- `PUT /api/comments/:commentId` → Update a comment.

#### **Like Routes**
- `GET /api/likes/:id` → Get likes for a post/comment.
- `POST /api/likes/toggle/:id` → Toggle like on a post/comment.

#### **Friendship Routes**
- `GET /api/friends/get-friends/:userId` → Get a user's friends.
- `GET /api/friends/get-pending-requests` → Get pending friend requests.
- `POST /api/friends/toggle-friendship/:friendId` → Toggle friendship.
- `POST /api/friends/response-to-request/:friendId` → Accept/reject friend request.

#### **OTP Routes**
- `POST /api/otp/send` → Send OTP for password reset.
- `POST /api/otp/verify` → Verify OTP.
- `POST /api/otp/reset-password` → Reset password.

---

### **Postman Collection**
- [Link to Postman Collection](https://www.postman.com/descent-module-specialist-28289611/workspace/postaway/collection/37224711-9ad78218-5999-4782-a621-b08a116c9781?action=share&creator=37224711)

**Steps to Use:**
1. Click the link.
2. Log in to Postman.
3. Fork the collection.
4. Modify parameters (`ObjectId`, `postId`, `commentId`, etc.) as needed.