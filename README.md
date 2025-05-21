Todo Summary Assistant
A full-stack web app that helps you manage your daily tasks and get automatic AI-generated summaries using the Cohere NLP API.

✨ Features
✅ Add, edit, and delete todos

🤖 Summarize tasks using Cohere AI

💾 Data stored in MongoDB

⚙️ Node.js + Express backend

💻 React frontend with Bootstrap UI

📡 RESTful API integration

🛠️ Tech Stack
Frontend:
React.js
Axios
Bootstrap 5

Backend:
Node.js
Express
MongoDB (via Mongoose)
Cohere API (NLP for summarization)
CORS and dotenv for environment configs


 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/todo-summary-assistant.git
cd todo-summary-assistant


2.Set up the Backend
bash
Copy
Edit
cd backend
npm install


Create a .env file in backend/ with:

env
Copy
Edit
COHERE_API_KEY=your-cohere-api-key
MONGO_URI=your-mongodb-uri


Run the server:

bash
Copy
Edit
node index.js
Server will start at: http://localhost:5000


 Set up the Frontend
bash
Copy
Edit
cd ../frontend
npm install
Run the React app:

bash
Copy
Edit
npm start
App will be available at: http://localhost:3000
