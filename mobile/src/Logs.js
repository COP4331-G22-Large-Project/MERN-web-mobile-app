import React from "react";
import { StyleSheet, Text, FlatList, Dimensions, View } from "react-native";

// Flat Grid

//**************** Flat grid stuff *****************************
const data = [
  { key: "A" },
  { key: "B" },
  { key: "C" },
  { key: "D" },
  { key: "E" },
  { key: "F" },
];

const formatData = (data, numColumns) => {
  // number of full rows data set has
  const numberOfFullRows = Math.floor(data.length / numColumns);

  // number of elements in last row
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      key: `blank-$
  {numberOfElementsLastRow}`,
      empty: true,
    });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 2;
// ***********************************************************

//export default class App extends React.Component {
export function Logs() {
  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render();
  return (
    <FlatList
      data={formatData(data, numColumns)}
      style={styles.container}
      renderItem={this.renderItem}
      numColumns={numColumns}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },

  item: {
    backgroundColor: "#4169e1",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
});
