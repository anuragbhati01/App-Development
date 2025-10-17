import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { api } from "@/convex/_generated/api";

export default function Index() {
  const {toggleDarkMode, colors} = useTheme();

  const todos = useQuery(api.todos.getTodos);

  const addTodo = useMutation(api.todos.addTodo);

  const styles = createStyles(colors);

  const clearAllTodos = useMutation(api.todos.clearAllTodos);
  return (
    <View
      style={ styles.container}
    >
      <Text style={ styles.content}>Todo App</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle for Dark mode</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({text: "go for walk"})}>
        <Text>Add a new todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAllTodos()}>
        <Text>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>{
  const styles = StyleSheet.create({
      container: {
        flex : 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        backgroundColor: colors.bg
      },
      content: {
        fontSize : 22
      },
  });
  return styles;
} 