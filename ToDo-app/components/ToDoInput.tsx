import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


const ToDoInput = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodo);

    const handlenewTodo = async () => {
        if(newTodo.trim()){
            try{
                await addTodo({text: newTodo.trim()});
                setNewTodo("");
            }
            catch(error){
                console.log("Error adding in todo", error);  
                Alert.alert("Error, Failed to add todo");
            }
        }
    };

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
            style={homeStyles.input}
            placeholder="What needs to be done?"
            value={newTodo}
            onChangeText={setNewTodo}
            onSubmitEditing={handlenewTodo}
            placeholderTextColor={colors.textMuted}
        />  
        <TouchableOpacity onPress={handlenewTodo} activeOpacity={0.8} disabled={!newTodo.trim()} >
            <LinearGradient 
                colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
            >
                <Ionicons name="add" size={24} color="#fff"></Ionicons>
            </LinearGradient>

        </TouchableOpacity>  
      </View>
    </View>
  )
}

export default ToDoInput