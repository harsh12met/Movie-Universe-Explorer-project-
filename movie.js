import config from './config.js';

// Fetch movies from OMDB API
async function fetchMovies() {
    try {
        // Simplified list with only the genres we want to show
        const popularMovies = [
            // Action
            'The Dark Knight', 'Mad Max: Fury Road', 'John Wick', 'Die Hard',
            'Mission Impossible', 'The Avengers', 'Gladiator', 'Top Gun: Maverick',
            
            // Drama
            'The Shawshank Redemption', 'Forrest Gump', 'The Godfather', 'Parasite',
            'Schindler\'s List', '12 Angry Men', 'The Green Mile', 'Goodfellas',
            
            // Adventure
            'Lord of the Rings', 'Indiana Jones', 'Avatar', 'Pirates of the Caribbean',
            'Jurassic Park', 'The Princess Bride', 'The Mummy', 'National Treasure',
            
            // Animation
            'Spirited Away', 'The Lion King', 'Spider-Man: Into the Spider-Verse', 'Toy Story',
            'Up', 'Coco', 'How to Train Your Dragon', 'Zootopia'
        ];
        
        // Add loading state
        const container = document.querySelector('.movie-container');
        container.innerHTML = '<div class="loading">Loading movies...</div>';

        // Fetch movies in smaller batches
        const batchSize = 5;
        const movies = [];
        
        for (let i = 0; i < popularMovies.length; i += batchSize) {
            const batch = popularMovies.slice(i, i + batchSize);
            const batchPromises = batch.map(async title => {
                try {
                    const response = await fetch(`${config.OMDB_API_URL}&t=${encodeURIComponent(title)}`);
                    const data = await response.json();
                    if (data.Response === "True") {
                        return {
                            title: data.Title,
                            year: data.Year,
                            genre: data.Genre.split(', ')[0], // Get first genre
                            description: data.Plot,
                            image: data.Poster !== "N/A" ? data.Poster : 'placeholder-image.jpg',
                            rating: data.imdbRating,
                            director: data.Director
                        };
                    }
                    return null;
                } catch (error) {
                    console.error(`Error fetching movie ${title}:`, error);
                    return null;
                }
            });
            
            const batchResults = await Promise.all(batchPromises);
            movies.push(...batchResults.filter(movie => movie !== null));
            displayMovies(movies);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        const container = document.querySelector('.movie-container');
        container.innerHTML = '<div class="error">Error loading movies. Please try again later.</div>';
        return [];
    }
}

// Since we don't have streaming data, we'll remove this function
// and update the movie display code to show IMDB rating instead
function displayMovies(movies, selectedGenre = 'All') {
    const container = document.querySelector('.movie-container');
    container.innerHTML = '';

    const filteredMovies = selectedGenre === 'All' 
        ? movies 
        : movies.filter(movie => {
            // Check if any of the movie's genres match the selected genre
            const movieGenres = movie.genre.split(', ');
            return movieGenres.includes(selectedGenre);
        });

    // Add a "no results" message if no movies are found
    if (filteredMovies.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h2>No movies found for "${selectedGenre}"</h2>
                <p>Try selecting a different genre or clearing the search.</p>
            </div>
        `;
        return;
    }

    filteredMovies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="rating-badge">⭐ ${movie.rating}</div>
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year} • ${movie.genre}</p>
        `;
        card.addEventListener('click', () => showMovieDetails(movie));
        container.appendChild(card);
    });
}

function showMovieDetails(movie) {
    const popup = document.getElementById('moviePopup');
    const popupContent = popup.querySelector('.popup-content');

    document.getElementById('popupPoster').src = movie.image;
    document.getElementById('popupTitle').textContent = movie.title;
    document.getElementById('popupYear').textContent = `${movie.year} | ${movie.genre}`;
    document.getElementById('popupDesc').textContent = movie.description;
    
    // Replace streaming links with director info
    document.getElementById('streamingLinks').innerHTML = `
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>IMDB Rating:</strong> ⭐ ${movie.rating}/10</p>
    `;

    // Remove trailer iframe since we don't have trailer links
    document.getElementById('popupTrailer').style.display = 'none';
    
    popup.style.display = 'flex';
}

function closePopup() {
    document.getElementById('moviePopup').style.display = 'none';
}

// Initialize
window.addEventListener('DOMContentLoaded', async () => {
    const movies = await fetchMovies();
    displayMovies(movies);

    // Search functionality
    document.getElementById('searchBar').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(query) || 
            movie.description.toLowerCase().includes(query)
        );
        displayMovies(filteredMovies);
    });

    // Genre filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const genre = btn.dataset.genre;
            displayMovies(movies, genre);
        });
    });

    // Add theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }

    // Theme toggle button
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});

// Make closePopup available globally
window.closePopup = closePopup;

// Add loading and error styles to CSS
const styles = `
.loading, .error {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    background: var(--card-light);
    border-radius: 20px;
    box-shadow: var(--shadow);
    margin: 1rem;
}

.dark-mode .loading, .dark-mode .error {
    background: var(--card-dark);
}

.loading::after {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--accent-color);
    border-radius: 50%;
    margin-left: 0.5em;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error {
    color: #e74c3c;
}
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
