import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movie data when the component mounts
    fetchMovies();
  }, []);

  // Function to fetch movie data using fetch API
  const fetchMovies = async () => {
    const url =
      "https://imdb-com.p.rapidapi.com/title/get-details?tconst=tt0120338";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "455737a369msh1d76dcd797313d0p15cf4cjsn53ab3b44f39e",
        "x-rapidapi-host": "imdb-com.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Parse the JSON response

      console.log(result.data.title.titleText.text);
      console.log(result.data.title.primaryImage.url);

      // Extract the relevant data (movie name and image)
      const movie = {
        name: result.data.title.titleText.text,
        image: result.data.title.primaryImage.url,
      };

      setMovies([movie]); // Store the movie data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setLoading(false);
    }
  };

  // Card component to display each movie
  const MovieCard = ({ movie }) => (
    <View style={styles.card}>
      <Image
        style={styles.movieImage}
        source={{ uri: movie.image }} // Image URL from API
      />
      <Text style={styles.movieTitle}>{movie.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f4f6f8",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    alignItems: "center",
  },
  movieImage: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
});

export default MoviePage;
