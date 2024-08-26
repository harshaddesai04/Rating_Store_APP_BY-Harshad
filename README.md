<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="public/store3d.jpg" alt="Logo" width="100" height="80">
  </a>

<h3 align="center">Store Rating WebApp</h3>

  <p align="center">
    A web application enabling users to submit a rating of any store
registered on this platform
    <br />
    <!-- <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br /> -->
    <br />
    <a href="https://store-rating-app.vercel.app/">View Demo</a>
    <!-- ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This project was done according to the requirements in the challenge given in the coding challenge section.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## MERN Stack

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Front end: [Github](https://github.com/RajathRao2000/store-rating-app-frontend)
Backend: [Github](https://github.com/RajathRao2000/backend_store-rating-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]

- ![Tailwind CSS](https://img.shields.io/static/v1?style=for-the-badge&message=Tailwind+CSS&color=222222&logo=Tailwind+CSS&logoColor=06B6D4&label=)
- ![MongoDB](https://img.shields.io/static/v1?style=for-the-badge&message=MongoDB&color=47A248&logo=MongoDB&logoColor=FFFFFF&label=)
- ![Vercel](https://img.shields.io/static/v1?style=for-the-badge&message=Vercel&color=000000&logo=Vercel&logoColor=FFFFFF&label=)
- ![.ENV](https://img.shields.io/static/v1?style=for-the-badge&message=.ENV&color=222222&logo=.ENV&logoColor=ECD53F&label=)
- ![Redux](https://img.shields.io/static/v1?style=for-the-badge&message=Redux&color=764ABC&logo=Redux&logoColor=FFFFFF&label=)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

<!-- ## Screenshots

### Admin-Dashboard

<img src="readme-assets/admin-dashboard.png" alt="Logo" width="500" height="300">

### Filter and View Users

<img src="readme-assets/filter and view users.png" alt="Logo" width="500" height="300">

### User-Dashboard

<img src="readme-assets/user-dashboard.png" alt="Logo" width="500" height="300">

### Change-Rating

<img src="readme-assets/change-rating.png" alt="Logo" width="500" height="300">

### Store Owner Dashboard

<img src="readme-assets/store-owner-dashboard.png" alt="Logo" width="500" height="300"> -->

## Coding Challenge

### Tech Stack

- **Backend:** Any NodeJs-based backend framework
- **Database:** Any non-relational/relational database
- **Frontend:** Any framework of React

### Requirement

We require a web application enabling users to submit a rating of any store registered on this platform. The rating will be between 1 to 5.

We will need a single login for all types of users, and based on the user’s role, they will see different functionalities on the page after login. For normal users, provide a signup page to register on the platform.

### User Personas (Roles):

- **System Admin**
- **Normal User**
- **Store Owner**

### System Admin Functionalities:

- Admin can add stores, normal users, and admin users in the system
- Show one dashboard page to the admin user with the following details:
  - Total Users
  - Total Stores
  - Total Users Submitted Rating
- The user addition form will have the following fields:
  - Name
  - Email
  - Password
  - Address
- During the store listing display, the following fields:
  - Name, Email, Address, Rating
- During the normal users and admin users listing display, the following fields:
  - Name, Email, Address, Role
- All the listings should have an option to apply a filter on these fields:
  - Name, email, address, and Role
- Allow an option for Admin users to see the following details of all types of users:
  - Name, email, address, and role
  - Rating - in case the user type is Store Owner
- Provide an option to logout from the system

### Normal User Functionalities:

- The user should be able to log in and sign up to the platform
- The signup form will have the following fields:
  - Name, Email, Address, Password
- Provide an option for the user to change the password after login
- The user should be able to see the list of all registered stores
- Allow users to search the store based on name and address
- Store listing will have to list the following details in the table:
  - Name
  - Address
  - Overall ratings
  - My submitted rating
  - Option to submit my rating
  - Option to modify my submitted rating
- Allow users to submit ratings between 1 to 5 to individual stores
- Provide an option to logout from the system

### Store Owner User Functionalities:

- The user should be able to log in to the platform
- After login, the user should be able to change the password
- On the dashboard, they should be able to see the list of users who have submitted the rating to their store
- On the dashboard, display the average total submitted ratings to their store
- Provide an option to logout from the system

### Validations

Validations should be present on all forms:

- The name length should be 60 characters max and 20 characters min
- The Address length should be 400 characters max
- The password length max 16 and 8 min, it should have at least 1 upper, and 1 special character in it.
- Email address validation should be there in the email field.

### Note:

- All the tables should have sorting (ascending/descending) functionality on important fields like name, email, etc.
- Follow best practices on both the frontend and backend sides.
- Best practices need to be followed on table schema design on the database side.

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
