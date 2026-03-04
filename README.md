# React + Vite
# Frontend Mentor - Shortly URL shortening API Challenge

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Key Features](#key-features)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size.
- Shorten any valid URL.
- See a list of their shortened links, even after refreshing the browser.
- Copy the shortened link to their clipboard in a single click.
- Receive error messages when the `form` is submitted if:
  - The `input` field is empty.
  - The URL submitted is invalid.



### Links

- Solution URL: [shortUrl](https://github.com/xpieemma/URL-Shortening-React)
- Live Site URL: [live site URL]()

## My process

### Built with

- Semantic HTML5 markup
- CSS Custom Properties (Variables)
- Flexbox & CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Frontend Tooling
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations and transitions
- [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests
- [React Hot Toast](https://react-hot-toast.com/) - For accessible, custom notifications

### Key Features

- **Custom State Hook:** Implemented a custom `useLocalStorage` hook to ensure the user's shortened links persist across browser sessions.
- **Robust Error Handling & Validation:** Built custom input validation logic to handle empty submissions and malformed URLs, paired with user-friendly toast notifications via `react-hot-toast`.
- **Smooth Animations:** Utilized `framer-motion` for page-load animations, hover states, and seamless entry/exit animations for the list of shortened links.
- **API Integration:** Successfully integrated a URL shortening service, handling asynchronous requests and potential network errors gracefully.

## Author

- **E. Pierre**
- GitHub - [@yourusername](https://github.com/xpieemma)
- LinkedIn - [E. Pierre](https://www.linkedin.com/in/epierr14)