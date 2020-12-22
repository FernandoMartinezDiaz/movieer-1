// Importar los módulos necesarios
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Fab,
  Icon,
  List,
  ListItem,
  Text,
  Body,
  Right,
} from "native-base";

import {ReseñasContext} from "../context/reseñaContext";

const ReseñaScreen = ({navigation})=>
{
  const {lasReseñas} = useContext(ReseñasContext);
  console.log("ViendoLaReseña");
  console.log(lasReseñas);

  return (
    <Container>
    <Content>
    <List>
          {lasReseñas
            ? lasReseñas.map((reseña) => (
                <ListItem
                  key={reseña.id.toString()}
                >
                  <ListItem itemDivider>
              <Text>{reseña.pelicula}</Text>
            </ListItem>
                  <Body>
                    <Text numberOfLines={2}>{reseña.review}</Text>
                  </Body>
                </ListItem>
              ))
            : null}
        </List>
    </Content>
  </Container>
  )
}

export default ReseñaScreen;