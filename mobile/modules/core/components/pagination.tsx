import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { secondaryColor } from "../constants/colors";
type ParamsType = {
  currentPage: number;
  amountOfPages: number;
  handlePagination: (page: number) => void;
  lastPage: number;
};

export const Pagination = ({
  amountOfPages,
  currentPage,
  handlePagination,
  lastPage,
}: ParamsType) => {
  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(lastPage, currentPage + 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        disabled={currentPage === 1}
        onPress={() => handlePagination(currentPage - 1)}
        style={[
          styles.paginationButton,
          currentPage === 1 && styles.disabledButton,
        ]}
      >
        <Text
          style={[
            styles.paginationText,
            currentPage === 1 && styles.disabledText,
          ]}
        >
          {"<"}
        </Text>
      </TouchableOpacity>

      {getVisiblePages().map((page) => (
        <TouchableOpacity
          key={page}
          style={[
            styles.paginationButton,
            currentPage === page && { backgroundColor: secondaryColor },
          ]}
          onPress={() => handlePagination(page)}
        >
          <Text>{page}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        disabled={currentPage === amountOfPages}
        onPress={() => handlePagination(currentPage + 1)}
        style={[
          styles.paginationButton,
          currentPage === amountOfPages && styles.disabledButton,
        ]}
      >
        <Text
          style={[
            styles.paginationText,
            currentPage === amountOfPages && styles.disabledText,
          ]}
        >
          {">"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  paginationButton: {
    paddingVertical: 7,
    paddingHorizontal:13,
    borderRadius: 6,
    borderColor: "#9c9c9c",
    borderWidth: 1,
  },
  paginationText: {
    fontWeight: "bold",
  },
  disabledButton: {
    borderColor: "#dadada",
    borderWidth: 1,
  },
  pageInfo: {
    fontSize: 16,
    color: "#333",
  },
  disabledText: {
    color: "#dadada",
  },
});
