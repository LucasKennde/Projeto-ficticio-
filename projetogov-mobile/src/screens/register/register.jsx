import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView} from "react-native";
import { styles } from './register.style.js';
import icons from '../../constants/icons.js';
import api from '../../service/api.js';

function Register(props) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const showLogin = async ()=>{
       
    props.navigation.navigate("login");
 }
  const botaoRegistrar = async () => {
    const confirmapassword = confSenha;
    
  
      
  

    
    if(nome === "" || cpf === "" || email==="" || senha==="" || confSenha===""){
        alert("Todos os campos precisam ser preenchidos ");
    }else{

        if(senha === confirmapassword){
            try {
                const newUser = {
                    nome: nome,
                    cpf: cpf,
                    email: email,
                    senha: senha,
                };
                const resp = await api.get("/validacao/"+cpf);
                const confirmval = resp.data;
                if(confirmval.length>0){
                  alert("Usuario já cadastrado")
                }else{
                  await api.post("/user", newUser);
                  alert("Usuário cadastrado com sucesso");
                  props.navigation.navigate("login");
                }
                
            } catch (error) {
                console.error("Erro ao registrar usuário:", error);
            }
        }else{
            alert("As senhas presisam ser iguais");
        }
        
    }
    };
    
  return (
    <View style={styles.bodyLogin}>
      <View style={styles.bodyLogo}>
        <Image source={icons.logo} style={styles.logo} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
      <View style={styles.bodyForm}>
      <Text style={styles.txt}>Nome:</Text>
            <TextInput style ={styles.loginInput} placeholder="Digite o nome" 
                        onChangeText={(texto) => setNome(texto)} />
            <Text style={styles.txt}>Cpf:</Text>
            <TextInput style ={styles.loginInput}keyboardType="decimal-pad" placeholder="Digite o CPF" 
                        onChangeText={(texto) => setCpf(texto)}/>
            <Text style={styles.txt}>E-mail:</Text>
            <TextInput style ={styles.loginInput} keyboardType="email-address" placeholder="Digite o e-mail"
                        onChangeText={(texto) => setEmail(texto)} />
            <Text style={styles.txt}>Senha:</Text>
            <TextInput style ={styles.loginInput}minLength={6} placeholder="Digite a senha"
                        onChangeText={(texto) => setSenha(texto)} secureTextEntry={true} />
            <Text style={styles.txt}>Confirmar senha:</Text>
            <TextInput style ={styles.loginInput}minLength={6} placeholder="Confirme a senha"
                        onChangeText={(texto) => setConfSenha(texto)} secureTextEntry={true} />
      </View>
      </ScrollView>

          <View style={styles.touchButton}>

              <TouchableOpacity style={styles.btn} onPress={showLogin}>
                            <Text style={styles.btnText}>Sair</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={botaoRegistrar}>
                <Text style={styles.btnText}>Registrar</Text>
              </TouchableOpacity>

          </View>
    </View>
  );
}

export default Register;
