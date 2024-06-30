import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { styles } from './cadEco.style.js';
import { Picker } from '@react-native-picker/picker';
import icons from '../../constants/icons.js';
import api from '../../service/api.js';


function CadEco(props){
    const [escolaridade, setEscolaridade] = useState("");
    const [emprego, setEmprego] = useState("");
    const [renda, setRenda] = useState("");
    const [beneficio, setBeneficio] = useState("");
    const idUser = props.route.params.id;

    const showLogin = async ()=>{
       
       props.navigation.navigate("login");
    }
    const cadEco = async ()=>{
  
    
                try {
                    const newUser = {
                        escolaridade: escolaridade,
                        emprego: emprego,
                        renda: renda,
                        beneficio: beneficio,
                        id_user:idUser,
                    };
                    const status = 2;
                    const update = {
                        status: status,
                        id_user:idUser,
                    };
                    await api.post("/economia", newUser);
                    await api.patch("/user", update);
                    alert("Cadastro finalizado com sucesso")
                    props.navigation.navigate("homeUser",  {id: idUser});

                } catch (error) {
                    console.error("Erro ao registrar usuário:", error);
                }
           
            
        
        
    }
    return(
        <View style={styles.bodyUser}>
            <View>
                <Image source={icons.logo} style={styles.logo} />
            </View>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            <View>
                <Text style={styles.title}>Situação Socioeconômica</Text>
            </View>
            
            


    <View style={styles.bodyForm}>
        <View style={styles.containerField}>

            <Text style={styles.inputLabel}>Situação de Emprego:</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={emprego}
                    onValueChange={(itemValue, itemIndex) => {
                        setEmprego(itemValue);
                    }}>
                    <Picker.Item label="Empregado" value="Empregado" />
                    <Picker.Item label="Desempregado" value="Desempregado" />
                    <Picker.Item label="Estudante" value="Estudante" />
                    <Picker.Item label="Aposentado" value="Aposentado" itemStyle={{ padding: 0 }} />
                    <Picker.Item label="Autônomo" value="Autônomo" />
                </Picker>
            </View>
        </View>   
        <View style={styles.containerField}> 
            <Text style={styles.inputLabel}>Escolaridade:</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={escolaridade}
                    onValueChange={(itemValue, itemIndex) => {
                        setEscolaridade(itemValue);
                    }}>
                    <Picker.Item label="Nenhuma" value="Nenhuma" />
                    <Picker.Item label="Ensino Fundamental" value="Ensino Fundamental" />
                    <Picker.Item label="Ensino Médio" value="Ensino Médio" />
                    <Picker.Item label="Ensino Superior Completo" value="Ensino Superior Completo" itemStyle={{ padding: 0 }} />
                    <Picker.Item label="Ensino Superior Incompleto" value="Ensino Superior Incompleto" />
                </Picker>
            </View>  

        </View>   
        <View style={styles.containerField}> 
            <Text style={styles.inputLabel}>Renda Mensal Familiar:</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={renda}
                    onValueChange={(itemValue, itemIndex) => {
                        setRenda(itemValue);
                    }}>
                    <Picker.Item label="Menos de R$ 500,00 " value="Menos de R$ 500,00" />
                    <Picker.Item label="R$ 500 - R$ 1.500" value="R$ 500 - R$ 1.500" />
                    <Picker.Item label="R$ 1.500 - R$ 2.500" value="R$ 1.500 - R$ 2.500" />
                    <Picker.Item label="R$ 2.500 - R$ 5.000" value="R$ 2.500 - R$ 5.000" itemStyle={{ padding: 0 }} />
                    <Picker.Item label="Mais de R$ 5.000" value="Mais de R$ 5.000" />
                </Picker>
            </View>

        </View>   
        <View style={styles.containerField}>     
            
            <Text style={styles.inputLabel}>Já recebe algum outro benefício social?</Text>
            <View style={styles.inputPicker}>
                <Picker selectedValue={beneficio}
                    onValueChange={(itemValue, itemIndex) => {
                        setBeneficio(itemValue);
                    }}>
                    <Picker.Item label="Sim" value="sim" />
                    <Picker.Item label="Não" value="nao" />
                   
                </Picker>
               
            </View>
            
        </View>
    </View> 
            </ScrollView>
            <View style={styles.touchButton}>
               
            <TouchableOpacity style={styles.btn} onPress={showLogin}>
                        <Text style={styles.btnText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnRegister} onPress={cadEco}>
                        <Text style={styles.btnText}>Registrar</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default CadEco;