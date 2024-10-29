# Messaging App

## Website Link

- [**WhatsUpp Website**](https://odin-messaging-app.netlify.app/)

## Key Features

- **Client Side Update Image**

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Prisma (ORM)
  - PostgreSQL (Database)
  - JWT (Authentication)
  - Railway (Deployment)
- **Frontend:**
  - React (Frameworks)
  - Netlify (Deployment)

## Debugging Notes

**More Common HTTP Request Patterns with Axios**

- Send data in get request with params:{}

```js
axios.get("url", {
  params: {
    // params
  },
});
```

- Send file data in post/put request with new FormData()

```js
const formData = new FormData();
formData.append("file", file);

// or axios.put()
axios.post("url", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
```
