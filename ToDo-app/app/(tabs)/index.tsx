import useTheme from "@/hooks/useTheme";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const {toggleDarkMode} = useTheme();
  return (
    <View
      style={ styles.container}
    >
      <Text style={ styles.content}>Hello this is our first app</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle for Dark mode</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor : "orange",
      gap: 10
  },
  content: {
    fontSize : 25,
  }
})
