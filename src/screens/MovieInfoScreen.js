import React, {useContext ,useEffect, useState } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import {
  Content,
  Text,
  H1,
  Spinner,
  Card,
  H2,
  View,
  Badge,
  Container,
  Input,
  Button,
  Icon,
} from "native-base";
import { Rating } from "react-native-ratings";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import {ReseñasContext} from "../context/reseñaContext";


const { apiUrl, apiKey, apiImageUrl, apiImageSize } = getEnvVars();

const { width, height } = Dimensions.get("window");

const MovieInfoScreen = ({ route, navigation }) => {
  // Obtener el id de la película
  const { id } = route.params;

  const reseñaContext = useContext(ReseñasContext);
  const { addNewReseña, refreshReseñas} = reseñaContext;

  const [nombreDePelicula, setNombreDePelicula] = useState("");
  const [reseña, setReseña] = useState("");

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [errorReseña, setErrorReseña] = useState(true);
  // Obtener la información de la película
  const getMovieInfo = async () => {
    try {
      const response = await backend.get(
        `${apiUrl}movie/${id}?api_key=${apiKey}&language=es-MX`
      );

      setMovie(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const handlerNewReseña = () => {
    // Validar que la nota tiene valor
    addNewReseña(nombreDePelicula,reseña);
  };

  // Efecto secundario que ejecuta la consulta a la API
  useEffect(() => {
    getMovieInfo();
  }, []);

  if (!movie) {
    return (
      <Content>
        <Spinner />
      </Content>
    );
  }

  return (
    <Container>
      <Content contentContainerStyle={styles.content}>
        <Image
          source={{ uri: `${apiImageUrl}${apiImageSize}/${movie.poster_path}` }}
          style={styles.moviePoster}
        />

        <Card cardBody style={styles.card}>
          
          <H1  style={styles.title} >{movie.title}</H1>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.movieDetailsValues}>
                {movie.vote_average}
              </Text>
              <Rating
                showRating={false}
                ratingCount={10}
                startingValue={movie.vote_average}
                readonly={true}
                imageSize={11}
                style={{ marginTop: 3 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              
              <Text style={styles.movieDetails}>Duración</Text>
            </View>
            <View style={{ flex: 1 }}>
              
              <Text style={styles.movieDetails}>Lanzamiento</Text>
            </View>
          </View>
          <H2 style={styles.h2}>Géneros</H2>
          <View style={styles.genresView}>
            {movie.genres.map((genre) => (
              <Badge key={genre.id} style={styles.genres}>
                <Text>{genre.name}</Text>
              </Badge>
            ))}
          </View>
          <H2 style={styles.h2}>Trama</H2>
          <Text>{movie.overview ? movie.overview : "No disponible"}</Text>
          <Input value={nombreDePelicula} onChangeText={setNombreDePelicula} placeholder="Escriba el nombre de la pelicula"></Input>
          <Text>{"\n"}</Text>
          <Input value={reseña} onChangeText={setReseña} placeholder="Escriba su reseña" ></Input>
          
          <Button style={styles.guardar} onPress={handlerNewReseña} >
          <Icon name="save" />
          </Button>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  moviePoster: {
    width: width,
    height: height,
    // resizeMode: "contain",
  },
  title: {
    textAlign: "center",
    marginTop: 5,
  },
  content: {
    // backgroundColor: "#ffffff",
  },
  overview: {
    color: "#00a5cf",
  },
  card: {
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    borderRadius: 10,
    marginTop: -height * 0.2,
  },
  movieDetails: {
    textAlign: "center",
    fontSize: 12,
  },
  movieDetailsValues: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
  },
  genres: {
    backgroundColor: "#7ae582",
    marginRight: 5,
    marginBottom: 5,
  },
  genresView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  h2: {
    marginTop: 10,
    marginBottom: 10,
  },
  guardar:
  {
    flex: 1,
    backgroundColor: "#7ae582",
    marginLeft: 10,
    height: 40,
  }
});

export default MovieInfoScreen;
