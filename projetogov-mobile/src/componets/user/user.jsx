import { Image, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { styles } from "./user.style.js";
import { useFocusEffect } from "@react-navigation/native";

const User = (props) => {
    function getStyleBySituacao(status) {
        switch (status) {
          case 'Aprovado':
            return styles.containerFildAprovado;
          case 'Analise':
            return styles.containerFildAnalise;
          case 'Rejeitado':
            return styles.containerFildRejeitado;
          default:
            return styles.defaultStyle;
        }
      }
      

    return(

    <TouchableOpacity onPress={() => props.onClick(props.id)}>
      
      <View key={props.id} style={getStyleBySituacao(props.situacao)}
>
            <View style={styles.user}>
                <Text style={styles.txt}>Nome: {props.nome}</Text>
                <Text style={styles.txt}>Cpf: {props.cpf}</Text>
            </View>
            <View style={styles.status}>
                <Text style={styles.txt}>Situação:</Text>
                <Text style={styles.txt}>{props.situacao}</Text>
            </View>
            
        </View>

       
    </TouchableOpacity>

)};

export default User;