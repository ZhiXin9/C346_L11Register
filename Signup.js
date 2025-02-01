import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const API_URL = "https://api.jsonbin.io/v3/b/679dca9dad19ca34f8f7e736";
const API_KEY = "$2a$10$JsyH9JH3zcJ48rBLqxySyOmnRt7j9XXvESW5q4J.LaHGg0zo8IaDe";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#a0c4ff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#005f73',
    },
    input: {
        borderWidth: 2,
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
        borderColor: '#0077b6',
        backgroundColor: '#ffffff',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#0096c7',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    submitText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const Signup = ({ navigation, route }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleRegister = () => {
        if (!username || !email || !phone) {
            Alert.alert("⚠️ Error", "All fields are required!");
            return;
        }

        let userData = JSON.parse(route.params.userData);
        let newUser = { username, email, phone };
        let updatedUsers = [...userData, newUser];

        fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Access-Key": API_KEY
            },
            body: JSON.stringify({ mydata: updatedUsers })
        })
            .then(response => response.json())
            .then(() => {
                Alert.alert("🎉 Success!", "You have registered successfully!");
                navigation.navigate("Home");
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert("❌ Error", "Failed to register. Please try again.");
            });
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>🚀 Register for the Contest</Text>

            <Text>📛 Username:</Text>
            <TextInput style={styles.input} onChangeText={setUsername} />

            <Text>📧 Email:</Text>
            <TextInput style={styles.input} onChangeText={setEmail} keyboardType="email-address" />

            <Text>📞 Phone:</Text>
            <TextInput style={styles.input} onChangeText={setPhone} keyboardType="phone-pad" />

            <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
                <Text style={styles.submitText}>Register Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;
