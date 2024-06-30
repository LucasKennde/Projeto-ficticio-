import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { styles } from './home.style.js';
import User from '../../componets/user/user.jsx'
import icons from '../../constants/icons.js';
import api from '../../service/api.js';
import { useFocusEffect } from "@react-navigation/native";


function Home(props) {
    const [users, setUser] = useState([]);
    const [filtro, setFiltro] = useState('');
    const OpenUsuario = (id) => {
        props.navigation.navigate("admUser", {
            id: id
        });
    }

    // Função para listar usuários
    const listarUser = async () => {
        try {
            const response = await api.get("/users");
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Função para sair
    function sair() {
        props.navigation.navigate("login");
    }

    // Atualizar a lista de usuários sempre que o filtro, a situação ou a tela forem focados
    useFocusEffect(useCallback(() => {
        listarUser();
    }, [filtro]));

    // Função para atualizar o estado do filtro
    const handleFilterChange = (text) => {
        setFiltro(text);
    };


    // Filtrar usuários com base no filtro e na situação ou no nome
    const filteredUsers = users.filter(user => {
        return (
            user.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            user.situacao.toLowerCase().includes(filtro.toLowerCase()) ||
            user.cpf.toLowerCase().includes(filtro.toLowerCase())
        );
    });

    return (
        <View style={styles.bodyLogin}>
            <View>
                <Image source={icons.logo} style={styles.logo} />
            </View>
            <View>
                <Text style={styles.title}>Solicitações:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Filtrar por nome ou situação"
                    onChangeText={handleFilterChange}
                    value={filtro}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {filteredUsers.map((user) => (
                    <User
                        key={user.id_user}
                        id={user.id_user}
                        nome={user.nome}
                        cpf={user.cpf}
                        email={user.email}
                        situacao={user.situacao}
                        onClick={OpenUsuario}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.btn} onPress={sair}>
                <Text style={styles.btnText}>Sair</Text>
            </TouchableOpacity>
            
        </View>
    );
}

export default Home;
