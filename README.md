# Lyst
## About
A simple todo app. Originally started as a small lab to learn/practice Redux and async thunks. Also my first full stack project. However I decided to turn it into a small productivity app for myself.

*This is hosted on a free tier on render...so takes a little while and then some to load. 😄

## Features
+ users can sign-up, login & logout.
+ users can select 2+ color schemes.
+ logged in users can do the following tasks:
    1. see today's tasks.
    2. choose to view tasks by date.
    3. choose to view tasks by project

+ Todos are saved as objects in an array and have the following structure.

```javascript
const todoList [
    {
        todo:"do something", 
        priority:1, 
        projects:["chores"],
        due: new Date(),
        notes: "Remember to la la la la...",
        owner: "current uid string from DB"
        }
];
```
## Structure
### file hierarchy
```javascript
src/
    pages/
        -_login/
            -_pages/
                -LoginPage.jsx
            -_components/
                -LoginForm.jsx
        -_home/
            -_pages/
                -HomePage.jsx
            -_components/
                -Navbar.jsx
                -Menu.jsx
                -SettingsMenu.jsx
                -TodoDisplay.jsx
                -Calendar.jsx
                -Todo.jsx
    css/
        -index.css
    utils/
    redux/
        -store.js
        -_reducers/
            -todoReducer.js
    App.jsx
    main.jsx
```
