import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { styles } from './home.style.js';
import { useFocusEffect } from "@react-navigation/native";
import icons from '../../constants/icons.js';
import api from '../../service/api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

function Home(props) {
    const [user, setUser] = useState({});
    const [pdfPath, setPdfPath] = useState(null);
    const idUser = props.route.params.id;

    const getStyleBySituacao = (status) => {
        switch (status) {
            case 'Aprovado':
                return styles.titleAprovado;
            case 'Analise':
                return styles.titleAnalise;
            case 'Rejeitado':
                return styles.titleRejeitado;
            default:
                return styles.defaultStyle;
        }
    };

    const fetchUserData = useCallback(async () => {
        try {
            const responseUsuario = await api.get("/user/" + idUser);
            setUser(responseUsuario.data);
        } catch (error) {
            console.log("Erro ao buscar usuário:", error.message);
        }
    }, [idUser]);

    const handleSair = () => {
        props.navigation.navigate("login");
    };

    useFocusEffect(useCallback(() => {
        fetchUserData();
    }, [fetchUserData]));

 

    if (Object.keys(user).length === 0) {
        return (
            <View style={styles.bodyLogin}>
                <Text>Carregando...</Text>
            </View>
        );
    };

    return (
        <View style={styles.bodyLogin}>
            <View>
                <Image source={icons.logo} style={styles.logo} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                {user.map((usuario) => {
                    return (
                        <View style={styles.containerField}>
                            <View style={styles.campoSituacao}>
                                <Text style={getStyleBySituacao(usuario.situacao)}>{usuario.situacao}</Text>
                            </View>
                            <View style={styles.containerDados}>
                                <View><Text style={styles.titleUser}>Dados pessoais:</Text></View>
                                <Text>Nome: {usuario.nome}</Text>
                                <Text>Cpf: {usuario.cpf}</Text>
                                <Text>E-Mail: {usuario.email}</Text>
                            </View>
                            <View style={styles.containerDados}>
                                <View><Text style={styles.titleUser}>Endereço:</Text></View>
                                <Text>Endereço: {usuario.rua}</Text>
                                <Text>Cep: {usuario.cep}</Text>
                                <Text>Cidade: {usuario.cidade}</Text>
                                <Text>Estado: {usuario.estado}</Text>
                            </View>
                            <View style={styles.containerDados}>
                                <View><Text style={styles.titleUser}>Situação socioeconômica:</Text></View>
                                <Text>Escolaridade: {usuario.escolaridade}</Text>
                                <Text>Emprego: {usuario.emprego}</Text>
                                <Text>Renda: {usuario.renda}</Text>
                                <Text>Benefício: {usuario.beneficio}</Text>
                            </View>

                            
                        </View>
                    )
                })}

            </ScrollView>
            <TouchableOpacity style={styles.btn} onPress={handleSair}>
                <Text style={styles.btnText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );

}

export default Home;
