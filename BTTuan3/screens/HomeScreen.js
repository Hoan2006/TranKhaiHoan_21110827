import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchUserProfile } from '../src/fetchUserProfile'; 

export default function HomeScreen({ navigation }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userProfile = await fetchUserProfile(user.uid);
        setProfile(userProfile);
      } else {
        console.error('No user found');
      }
    });

    return () => {
      unsubscribe(); // Dọn dẹp listener
    };
  }, []);

  return (
    <View style={styles.container}>
      {profile ? (
        <View style={styles.card}>
          <Image
            style={styles.logo}
            source={{ uri: 'https://free.vector6.com/wp-content/uploads/2020/03/StockAnhDep006-150x150.jpg' }} // Thay bằng URL logo của bạn
          />
          <Text style={styles.welcomeText}>Welcome, {profile.fullName}!</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Email: {profile.email}</Text>
            <Text style={styles.infoText}>Birth Date: {profile.birthDate}</Text>
            <Text style={styles.infoText}>Address: {profile.address}</Text>
            <Text style={styles.infoText}>Profession: {profile.profession}</Text>
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>Loading profile...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: 16,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular image
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 2, // Shadow effect for Android
    shadowColor: '#000', // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
});
