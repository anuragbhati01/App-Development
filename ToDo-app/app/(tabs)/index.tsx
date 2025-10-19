import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { TouchableOpacity, Text, StatusBar } from "react-native";
import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import ToDoInput from "@/components/ToDoInput";

export default function Index() {
  const { colors } = useTheme();

  const todos = useQuery(api.todos.getTodos);
  const homeStyles = createHomeStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}></StatusBar>
      <SafeAreaView style={ homeStyles.safeArea}>

        <Header/>
        <ToDoInput/>
          {todos?.map(todo => (
            <Text></Text>
          ))}
      </SafeAreaView>
    </LinearGradient>
  );
}
