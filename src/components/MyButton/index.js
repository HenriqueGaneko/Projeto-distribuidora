import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MyButton({ backgroundColor, text, onPress, style }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: backgroundColor || "#E0B201" },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    color: "#000000",
    fontWeight: "500",
  },
});
