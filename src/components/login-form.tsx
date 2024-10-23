import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Login logic here
  };

  return (
    <View className="flex-1 justify-center">
      <Text className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-neutral-800">
        Login
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-white text-gray-700"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#A9A9A9"
      />

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-6 bg-white text-gray-700"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />

      <View className="bg-blue-600 p-3 rounded-lg">
        <Text className=" text-white text-center font-bold">Login</Text>
      </View>
    </View>
  );
}
