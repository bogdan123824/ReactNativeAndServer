import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotesProps {
  title: string;
  content: string;
}

const Notes: React.FC<NotesProps> = ({ title, content }) => {
  return (
    <View style={styles.note}>
      <View style={styles.pin} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: '#FEECE2', 
    padding: 20,
    borderRadius: 16,
    width: 180,
    height: 180,
    margin: 15,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5B89E',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: '#5A3E36',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    color: '#6E4B3B',
    lineHeight: 20,
  },
  pin: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    backgroundColor: '#B85C38',
    borderRadius: 50,
  },
});

export default Notes;
