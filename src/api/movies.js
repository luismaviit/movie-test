export async function getMovies() {
    const response = await fetch('https://api.tvmaze.com/shows');
    const data = await response.json();
    return data;
  }