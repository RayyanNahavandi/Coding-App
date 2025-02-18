import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Keyboard, ScrollView, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Language = 'javascript' | 'python' | 'java';

const codingExercises: Record<Language, { question: string; starterCode: string; correctAnswer: string }> = {
  javascript: {
    question: "Complete the function to return the sum of two numbers.",
    starterCode: "function sum(a, b) {\n  // Your code here\n}",
    correctAnswer: "return a + b;",
  },
  python: {
    question: "Complete the function to return the sum of two numbers.",
    starterCode: "def sum(a, b):\n  # Your code here",
    correctAnswer: "return a + b",
  },
  java: {
    question: "Complete the method to return the sum of two numbers.",
    starterCode: "public int sum(int a, int b) {\n  // Your code here\n}",
    correctAnswer: "return a + b;",
  },
};

const normalizeCode = (code: string) => {
  return code.replace(/\s+/g, '').replace(/;/g, '');
};

const SecondGame = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleCheck = () => {
    const exercise = codingExercises[language];
    const normalizedInput = normalizeCode(input);
    const normalizedAnswer = normalizeCode(exercise.correctAnswer);

    if (normalizedInput === normalizedAnswer) {
      setScore(score + 1);
      setAttempts(0); // Reset attempts on correct answer
      Alert.alert('Correct!', 'Your answer is correct.');
    } else {
      setAttempts(attempts + 1);
      if (attempts + 1 >= 3) {
        Alert.alert('Incorrect', `The correct answer is: ${exercise.correctAnswer}`);
        setAttempts(0); // Reset attempts after showing the correct answer
      } else {
        Alert.alert('Incorrect', 'Try again.');
      }
    }
    setInput('');
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const exercise = codingExercises[language];

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <TextInput
              style={styles.input}
              placeholder="Write your code here"
              value={input}
              onChangeText={setInput}
              placeholderTextColor="white"
              returnKeyType="done"
              onSubmitEditing={dismissKeyboard}
            />

            <Text style={styles.title}>Coding Exercise</Text>
            <Text style={styles.score}>Score: {score}</Text>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={language}
                style={styles.picker}
                onValueChange={(itemValue) => setLanguage(itemValue)}
              >
                <Picker.Item label="JavaScript" value="javascript" />
                <Picker.Item label="Python" value="python" />
                <Picker.Item label="Java" value="java" />
              </Picker>
            </View>

            <Text style={styles.question}>{exercise.question}</Text>
            
            <View style={styles.codeContainer}>
              <Text style={styles.starterCode}>{exercise.starterCode}</Text>
            </View>

            <Button title="Check" onPress={handleCheck} color="#841584" />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 50, // Ensures no overlap with keyboard
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  score: {
    fontSize: 22,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background to make text visible
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 5, // Adds space inside the picker box
  },
  picker: {
    height: 50,
    color: 'white',
  },
  question: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15, // Extra margin to separate from picker
    paddingHorizontal: 10,
  },
  codeContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  starterCode: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'monospace',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 15, // Ensure proper spacing
    marginTop: 50, // Keep it visible at the top
  },
});

export default SecondGame;
