import { useRouter } from 'expo-router'; 

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../config/firebase-config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('เข้าสู่ระบบสำเร็จ!', `Welcome ${userCredential.user.email}`);
      router.replace('(tabs)'); // ไปที่หน้าแท็บหลังล็อกอิน
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('สมัครสมาชิกสำเร็จ!', `Welcome ${userCredential.user.email}`);
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo2.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>เข้าสู่ระบบ</Text>

      {/* ช่องกรอก Email */}
      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* ช่องกรอก Password */}
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* ปุ่มสมัครสมาชิก */}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>สมัครสมาชิก</Text>
      </TouchableOpacity>

      {/* ปุ่มเข้าสู่ระบบ */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>ช่องทางอื่นๆ</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <FontAwesome name="facebook-square" size={40} color="#3b5998" style={styles.icon} />
        <FontAwesome name="google" size={40} color="#db4a39" style={styles.icon} />
        <FontAwesome name="line" size={40} color="#00c300" style={styles.icon} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDF21D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#009739',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginVertical: 10,
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    borderColor: '#009739',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#000',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
});
