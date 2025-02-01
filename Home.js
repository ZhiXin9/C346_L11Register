import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const API_URL = "https://api.jsonbin.io/v3/b/679dca9dad19ca34f8f7e736";
const API_KEY = "$2a$10$JsyH9JH3zcJ48rBLqxySyOmnRt7j9XXvESW5q4J.LaHGg0zo8IaDe";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#a0c4ff',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    listStyle: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 10,
        borderRadius: 12,
        borderLeftWidth: 5,
        borderColor: '#0077b6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    registerButton: {
        backgroundColor: '#0077b6',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    registerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});

const Home = ({ navigation }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: { "X-Access-Key": API_KEY }
                });
                const data = await response.json();
                setUsers(data.record.mydata || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.header}>📜 Contest Participants</Text>

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate("Signup", { userData: JSON.stringify(users) })}>
                <Text style={styles.registerText}>Join the Contest</Text>
            </TouchableOpacity>

            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.listStyle}>
                        <Text>📛 <Text style={{ fontWeight: 'bold' }}>Username:</Text> {item.username}</Text>
                        <Text>📧 <Text style={{ fontWeight: 'bold' }}>Email:</Text> {item.email}</Text>
                        <Text>📞 <Text style={{ fontWeight: 'bold' }}>Phone:</Text> {item.phone}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default Home;
