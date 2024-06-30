import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { styles } from './admUser.Style.js';
import { useFocusEffect } from "@react-navigation/native";
import icons from '../../constants/icons.js';
import api from '../../service/api.js';

function AdmUser(props){
    const [user, setUser] = useState({});
    const idUser = props.route.params.id;
    const aprovar = "Aprovado";
    const reprovar = "Rejeitado";
    const getStyleBySituacao = (status)=> {
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
    //Função para listar usuários
    const fetchUserData = useCallback(async () => {
        try {
            const responseUsuario = await api.get("/user/"+idUser);
            setUser(responseUsuario.data);
        } catch (error) {
            console.log("Erro ao buscar usuário:", error.message);
        }
    }, [idUser]);

    const handleVoltar = ()=> {
        props.navigation.navigate("homeAdmin");
    };

    useFocusEffect(useCallback(() => {
       fetchUserData();
    }, [fetchUserData]));

    // Verifica se o usuário está vazio
    if (Object.keys(user).length === 0) {
        return (
            <View style={styles.bodyLogin}>
                <Text>Carregando...</Text>
            </View>
        );
    };

    const updateSituacao = async (situacao)=>{
        try {
            const update = {
                situacao: situacao,
                id_user:idUser,
            };
        await api.patch("/situacao", update);
        alert("Usuario: "+situacao);
        props.navigation.navigate("homeAdmin");
        }catch{

        }
    }
    // Renderiza os detalhes do usuário se os dados estiverem disponíveis
    return (
        <View style={styles.bodyLogin}>
            <View>
                <Image source={icons.logo} style={styles.logo} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

            {user.map((usuario)=>{
                return(
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

                        <View style={styles.touchButton}>
                            <TouchableOpacity style={styles.btnReprovar} onPress={()=>updateSituacao(reprovar)}>
                                <Text style={styles.btnText}>Reprovar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnAprovar} onPress={()=>updateSituacao(aprovar)}>
                                <Text style={styles.btnText}>Aprovar</Text>
                            </TouchableOpacity>
                        </View>



                    </View>
                )
            })
            
        }   
                

            </ScrollView>
            <TouchableOpacity style={styles.btn} onPress={handleVoltar}>
                <Text style={styles.btnText}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AdmUser;
