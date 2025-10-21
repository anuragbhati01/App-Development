import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { TouchableOpacity, Alert, StatusBar, FlatList, View, Text, TextInput } from "react-native";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import ToDoInput from "@/components/ToDoInput";
import EmptyState from "@/components/EmptyState";
import { useState } from "react";


type Todo = Doc<"todos">

export default function Index() {
  const { colors } = useTheme();

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if(isLoading) return <LoadingSpinner/>
  
  const handleToggleTodo = async (id:Id<"todos">) => {
    try {
      await toggleTodo({id});
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  }

  const handleDeleteTodo = async (id:Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {text:"Cancel", style:"cancel"},
      {text:"Delete", style:"destructive", onPress: () => deleteTodo({id}) },
    ]);
  }

  const handleEditTodo = (todo:Todo) => {
    setEditText(todo.text)
    setEditingId(todo._id)
  }
  const handleSaveEdit = async () => {
    if(editingId){
      try {
        await updateTodo({id: editingId, text: editText});
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.log("Error updating todo", error);
        Alert.alert("Error", "Failed to update todo");
      }
    }
  }
  const handleCancelEdit = () => {
    setEditText("");
    setEditingId(null);
  }

  const renderTodoItem = ({item} : {item: Todo} ) => {
    const isEditing = editingId === item._id;

    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient 
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0}}
          end={{ x: 1, y : 1}}
        >
          <TouchableOpacity
          style={homeStyles.checkbox}
          activeOpacity={0.7}
          onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient
            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
            style={[
              homeStyles.checkboxInner,
              {borderColor: item.isCompleted ? "transparent" : colors.border},
            ]}
            >
              {item.isCompleted && <Ionicons name="checkmark"  size={18} color="#fff" />}

            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
            <View style={homeStyles.editContainer}>
                <TextInput 
                  style={homeStyles.editInput}
                  value={editText}
                  onChangeText={setEditText}
                  autoFocus
                  multiline
                  placeholder="Edit your todo.."
                  placeholderTextColor={colors.textMuted}
                />
                <View style={homeStyles.editButtons}>
                  <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                    <LinearGradient style={homeStyles.editButton} colors={colors.gradients.success}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                      <Text style={homeStyles.editButtonText}>Save</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                    <LinearGradient style={homeStyles.editButton} colors={colors.gradients.muted}>
                      <Ionicons name="close" size={16} color="#fff" />
                      <Text style={homeStyles.editButtonText}>Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
            <Text style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine : "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
            ]}>
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.7}>
                <LinearGradient style={homeStyles.actionButton} colors={colors.gradients.warning}>
                  <Ionicons name="pencil" size={14} color="#fff">
                  </Ionicons>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.7}>
                <LinearGradient style={homeStyles.actionButton} colors={colors.gradients.danger}>
                  <Ionicons name="trash" size={14} color="#fff">
                  </Ionicons>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          )}
        </LinearGradient>  
      </View>
    );
  }


  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}></StatusBar>
      <SafeAreaView style={ homeStyles.safeArea}>

        <Header/>
        <ToDoInput/>
        <FlatList
          data={todos}
          renderItem={renderTodoItem} 
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState/>}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
