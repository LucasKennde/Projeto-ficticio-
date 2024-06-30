import React, {  useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { styles } from './login.style.js';
import { useFocusEffect } from "@react-navigation/native";
import icons from '../../constants/icons.js';
import api from '../../service/api.js'; // Importe o arquivo de serviço API

function Login(props) {
    const [cpf, setCpf] = useState();
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        try {
            const response = await api.post("/login", { cpf, senha });
            if (response.data.status === "admin") {
                props.navigation.navigate("homeAdmin");
                setCpf("");
                setSenha("");
            }   else if(response.data.status === "user"){
                alert(`Olá ${response.data.nome} Precisamos concluir o seu cadastro`)
                props.navigation.navigate("cadEnd", { id: response.data.id, nome: response.data.nome  });
                setCpf("");
                setSenha("");
                }
                else if(response.data.status === "1"){
                alert(`Falta Pouco ${response.data.nome} Precisamos saber mais sobre você`)
                props.navigation.navigate("cadEco", { id: response.data.id});
                setCpf("");
                setSenha("");
                }else if(response.data.status === "2"){  
                props.navigation.navigate("homeUser", { id: response.data.id });
                setCpf("");
                setSenha("");
            }
        } catch (error) {
            alert("Os dados estão incorretos");
        }
    };

    const botaoRegistrar = () => {
        props.navigation.navigate("register");
    }


    return (
        <View style={styles.bodyLogin}>
            <View>
                <Image source={icons.logo} style={styles.logo} />
            </View>
            <View style={styles.bodyForm}>
                <Text style={styles.txt} >Cpf:</Text>
                <TextInput
                    style={styles.loginInput}
                    keyboardType="decimal-pad"
                    placeholder="Digite o Cpf"
                    onChangeText={setCpf}
                    value={cpf}
                />
                <Text style={styles.txt}>Senha:</Text>
                <TextInput
                    style={styles.loginInput}
                    placeholder="Digite a senha"
                    onChangeText={setSenha}
                    secureTextEntry={true} // Para ocultar a senha
                    value={senha}
                />
                <View style={styles.touchButton}>
                    <TouchableOpacity style={styles.btnRegister} onPress={botaoRegistrar}>
                        <Text style={styles.btnTextRegister}>Registre-se</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                        <Text style={styles.btnText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Login;
