# Movie Universe Explorer 🎬

A modern, responsive web application that allows users to explore and discover movies across different genres. Built with vanilla JavaScript and powered by the OMDB API.

## Features

- 🎭 Browse movies across multiple genres (Action, Drama, Adventure, Animation)
- 🔍 Search functionality for movies by title or description
- 🌗 Dark/Light theme toggle with persistent preference
- ⭐ Movie ratings and detailed information
- 📱 Fully responsive design
- 🎬 Movie details modal with director information and IMDB ratings

## Live Demo

[Add your live demo link here]

## Screenshots

[Add screenshots of your application here]

## Technologies Used

- HTML5
- CSS3 (Modern CSS features including Grid, Flexbox, and CSS Variables)
- JavaScript (ES6+, Async/Await)
- OMDB API for movie data
- Local Storage for theme persistence

## Getting Started

1. Clone the repository:

bash
git clone [your-repo-url]


2. Create a `config.js` file in the root directory:

javascript
export default {
OMDB_API_URL: 'https://www.omdbapi.com/?apikey=YOUR_API_KEY'
};


3. Get your free API key from [OMDB API](http://www.omdbapi.com/)

4. Open `index.html` in a modern web browser using a local server

## Project Structure

Movie.html
movie-universe/
├── index.html # Main HTML file
├── movie.css # Styles
├── movie.js # Main JavaScript file
└── config.js # API configuration


## Features in Detail

### Movie Browsing
- Grid layout of movie cards with hover effects
- Movie posters with rating badges
- Basic movie information on cards

### Search and Filtering
- Real-time search functionality
- Genre-based filtering
- No-results handling with user-friendly messages

### Movie Details
- Detailed movie information in a modal
- Director information
- IMDB ratings
- Responsive image display

### Theme Switching
- Toggle between light and dark themes
- Theme preference saved in local storage
- Smooth transitions between themes

## API Integration

The project uses the OMDB API to fetch movie data. Each movie card displays:
- Movie title
- Release year
- Genre
- IMDB rating
- Movie poster
- Plot description (in modal)
- Director information (in modal)

## Responsive Design

The application is fully responsive and works across:
- Desktop computers
- Tablets
- Mobile phones

## Browser Support

Supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[Add your license here]

## Acknowledgments

- Movie data provided by [OMDB API](http://www.omdbapi.com/)
- Icons and emojis from [Unicode Emoji](https://unicode.org/emoji/charts/full-emoji-list.html)
