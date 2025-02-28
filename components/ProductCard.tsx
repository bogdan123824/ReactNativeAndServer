import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ProductCardProps {
  title: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  imageUrl: string;
  inStock: boolean;
  labels: string[];
}

const labelColors = {
  'Акция': '#e65a2e',
  'Хит продаж': '#e9a631',
  'Топ': '#53a974',
};

const ProductCard: React.FC<ProductCardProps> = ({ title, price, oldPrice, discount, imageUrl, inStock, labels }) => {
  const [iconBackgroundColor, setIconBackgroundColor] = useState('ghostwhite');

  const getLabelColor = (label: string) => {
    return labelColors[label] || '#808080';
  };

  return (
    <View
      style={styles.card}
      onMouseEnter={() => setIconBackgroundColor('darkviolet')}  
      onMouseLeave={() => setIconBackgroundColor('ghostwhite')}  
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <View style={styles.labels}>
          {labels.map((label, index) => (
            <Text key={index} style={[styles.label, { backgroundColor: getLabelColor(label) }]}>
              {label}
            </Text>
          ))}
        </View>
        <Text style={[styles.stock, !inStock && styles.outOfStock]}>
          {inStock ? 'В наличии' : 'Нет в наличии'}
        </Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          {oldPrice && <Text style={styles.oldPrice}>{oldPrice} грн </Text>}
          {discount && <Text style={styles.discount}>-{discount}</Text>}
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{price} грн</Text>
          <TouchableOpacity
            style={[styles.cartIcon, { backgroundColor: iconBackgroundColor }]} 
            onPress={() => console.log('Добавлено в корзину')}
          >
            <FontAwesome name="shopping-cart" size={24} color={iconBackgroundColor === 'ghostwhite' ? '#000' : 'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 230,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'space-between',
    height: 260,
    marginTop: 150,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  info: {
    marginBottom: 190,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start',
  },
  labels: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
  },
  label: {
    color: '#fff',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  stock: {
    fontSize: 12,
    marginTop: 5,
    color: 'green',
  },
  outOfStock: {
    color: 'red',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
    flexShrink: 1, 
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    flexWrap: 'wrap', 
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
    marginRight: 5,
  },
  discount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 15,
    backgroundColor: 'green',
    borderRadius: 5,
    width: 35,
    textAlign: 'center',
    flexShrink: 1, 
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartIcon: {
    padding: 5,
    borderRadius: 7,
  },
});

export default ProductCard;
