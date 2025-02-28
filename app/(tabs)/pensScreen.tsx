import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

const API_URL = "https://c115-84-245-121-161.ngrok-free.app";

interface Pen {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

type RootStackParamList = {
  pensScreen: { sellerId: number };
};

type PensScreenRouteProp = RouteProp<RootStackParamList, 'pensScreen'>;

const PensScreen: React.FC = () => {
  const route = useRoute<PensScreenRouteProp>();  
  const { sellerId } = route.params;  
  const [pens, setPens] = useState<Pen[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/all_pens/`)
      .then((res) => res.json())
      .then((data: Pen[]) => setPens(data))
      .catch((error) => console.error("Ошибка загрузки ручек:", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Доступные ручки</Text>
      <FlatList
        data={pens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image && (
              <Image
                source={{ uri: `${API_URL}/static/${item.image}` }}
                style={styles.image}
              />
            )}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>{item.price} $</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Купить</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default PensScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
