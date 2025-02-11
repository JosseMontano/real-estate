import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, Animated, Pressable } from "react-native";
import { primaryColor } from "../constants/colors";

type ParamsType = {
  text: string;
  fullWidth?: boolean;
  withAnimation?: boolean; 
  handleOnSubmit?: any;
};

export const Btn = ({ text, fullWidth = false, withAnimation = false,handleOnSubmit }: ParamsType) => {
  const positionX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (withAnimation) {
      // Define the animation sequence
      const animate = () => {
        Animated.sequence([
          // Move to the right (x)
          Animated.timing(positionX, {
            toValue: 10, // Move to the right
            duration: 500, // Duration of the animation
            useNativeDriver: true, // Use native driver for better performance
          }),
          // Move to the left (y)
          Animated.timing(positionX, {
            toValue: -10, // Move to the left
            duration: 500, // Duration of the animation
            useNativeDriver: true,
          }),
          Animated.timing(positionX, {
            toValue: 10, // Move to the right
            duration: 700, // Duration of the animation
            useNativeDriver: true, // Use native driver for better performance
          }),
          Animated.timing(positionX, {
            toValue: -10, // Move to the left
            duration: 700, // Duration of the animation
            useNativeDriver: true,
          }),
          // Wait for 3 seconds
          Animated.delay(3000), // Delay for 3 seconds
        ]).start(() => animate()); // Repeat the animation
      };

      animate(); // Start the animation
    }

    // Cleanup the animation when the component unmounts
    return () => {
      positionX.stopAnimation(); // Stop the animation
    };
  }, [withAnimation]); // Re-run effect if `withAnimation` changes

  return (
    <View style={[styles.btnContainer, !fullWidth && { alignItems: "center" }]}>
      <Animated.View style={{ transform: withAnimation ? [{ translateX: positionX }] : [] }}>
        <Pressable style={styles.btn} onPress={handleOnSubmit}>
          <Text style={styles.btnText}>{text}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: primaryColor,
    padding: 13,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600", // Note: fontWeight should be a string
  },
});