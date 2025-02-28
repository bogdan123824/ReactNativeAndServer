import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  pensScreen: { sellerId: number };
};

const API_URL = "https://c115-84-245-121-161.ngrok-free.app";

const AuthScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [walletAddress, setWalletAddress] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(true);

    const handleAuth = async () => {
        if (!walletAddress || !password) {
            Alert.alert("Ошибка", "Введите кошелек и пароль");
            return;
        }

        const endpoint = isRegister ? "/register_seller" : "/login_seller";
        const formData = new FormData();
        formData.append("wallet_address", walletAddress);
        formData.append("password", password);

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Успешно", isRegister ? "Регистрация успешна!" : "Вход выполнен!");
                navigation.navigate("pensScreen", { sellerId: data.seller_id });
            } else {
                Alert.alert("Ошибка", data.detail || "Произошла ошибка");
            }
        } catch (error) {
            console.error("Ошибка запроса:", error);
            Alert.alert("Ошибка", "Не удалось выполнить запрос");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegister ? "Регистрация" : "Вход"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Кошелек"
                value={walletAddress}
                onChangeText={setWalletAddress}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isRegister ? "Зарегистрироваться" : "Войти"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                <Text style={styles.switchText}>
                    {isRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Регистрация"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    switchText: {
        marginTop: 15,
        color: "#007BFF",
    },
});
