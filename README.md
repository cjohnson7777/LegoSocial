# Project Overview:
A full-stack web application allowing users to sign up, discover, like, save, and comment on Lego sets. Allowing users to curate personal collections.

# Tech Stack:
- Frontend: React
- Backend: Django REST Framework
- Database: SQLite
- Authentication: JWT (JSON Web Tokens)

# Key Features:
- User registration and secure login via JWT authentication.
- Full CRUD functionality for user collections and saved sets.
- Interactive comment system for community engagement.
- Dynamic frontend components for managing user content.  

# Setup and Run Locally:
1. Clone this repository:
```
git clone https://github.com/cjohnson7777/LegoSocial
```
2. Backend Setup:
```cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
3. Frontend Setup:
```
cd ../frontend
npm install
npm start
```
