import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from './cadEnd.style.js';
import { Picker } from '@react-native-picker/picker';
import icons from '../../constants/icons.js';
import api from '../../service/api.js';


function CadEnd(props){
    const [endereco, setRua] = useState("");
    const [cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [telefone, setTel] = useState("");
    const nome = props.route.params.nome;
    const idUser = props.route.params.id;

    const showLogin = async ()=>{
       
       props.navigation.navigate("login");
    }
    const cadEndereco = async ()=>{
        
        if(endereco === "" || cep === "" || cidade==="" || estado==="" || telefone===""){
            alert("Todos os campos precisam ser preenchidos ");
        }else{
    
                try {
                    const newUser = {
                        rua: endereco,
                        cep: cep,
                        cidade: cidade,
                        estado: estado,
                        telefone:telefone,
                        id_user:idUser,
                    };
                    const status = 1;
                    const update = {
                        status: status,
                        id_user:idUser,
                    };
                    await api.post("/endereco", newUser);
                    await api.patch("/user", update);
                    alert(`Falta Pouco ${nome} Precisamos saber mais sobre você`)
                    props.navigation.navigate("cadEco", {id: idUser, nome:nome});
                } catch (error) {
                    console.error("Erro ao registrar usuário:", error);
                }
           
            
        }
        
    }
    return(
        <View style={styles.bodyUser}>
            <View>
                <Image source={icons.logo} style={styles.logo} />
            </View>
            <View>
                <Text style={styles.title}>Endereço</Text>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>

            <View style={styles.bodyForm}>
            <Text style={styles.txt}>Endereço completo:</Text>
            <TextInput style ={styles.loginInput} placeholder="Rua, número, complemento" 
                        onChangeText={(texto) => setRua(texto)} />
            <Text style={styles.txt}>CEP:</Text>
            <TextInput style ={styles.loginInput}keyboardType="decimal-pad" placeholder="Digite o CEP" 
                        onChangeText={(texto) => setCep(texto)}/>
            <Text style={styles.txt}>Cidade:</Text>
            <TextInput style ={styles.loginInput} placeholder="Digite a cidade"
                        onChangeText={(texto) => setCidade(texto)} />
            <Text style={styles.txt}>Estado:</Text>
            <TextInput style ={styles.loginInput} placeholder="Digite o estado"
                        onChangeText={(texto) => setEstado(texto)}/>
            <Text style={styles.txt} keyboardType="decimal-pad">Telefone:</Text>
            <TextInput style ={styles.loginInput} placeholder="DDD 9 xxxxxxxx"
                        onChangeText={(texto) => setTel(texto)} />

        <View style={styles.touchButton}>
        
        </View>
      </View>
                
            </ScrollView>
            <View style={styles.touchButton}>
            <TouchableOpacity style={styles.btn} onPress={showLogin}>
                        <Text style={styles.btnText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegister} onPress={cadEndereco}>
                        <Text style={styles.btnText}>Registrar</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default CadEnd;