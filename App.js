import React, { useState } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Navigator from "./web-build/routes/homestack";

export default function App() {
  return <Navigator />;
}
