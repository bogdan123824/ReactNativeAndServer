// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// const destinationDetails = {
//   NewYork: {
//     description: "Known as the Big Apple, New York City is famous for its iconic skyline, Broadway shows, and diverse culture.",
//     image: require('@/assets/NewYork.jpg'),
//     attractions: ["Statue of Liberty", "Central Park", "Empire State Building"],
//   },
// };

// export default function NewYorkScreen() {
//   const destination = 'NewYork'; 
//   const details = destinationDetails[destination];

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>{destination}</Text>
//       </View>
//       <View style={styles.contentBox}>
//         <Image source={details.image} style={styles.image} />
//         <Text style={styles.description}>{details.description}</Text>
//         <Text style={styles.subtitle}>Top Attractions:</Text>
//         {details.attractions.map((attraction, index) => (
//           <Text key={index} style={styles.attraction}>{attraction}</Text>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     width: '100%',
//     padding: 20,
//     backgroundColor: '#4CBB17',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white'
//   },
//   contentBox: {
//     padding: 20,
//     backgroundColor: '#4CBB17',
//     borderRadius: 10,
//     marginHorizontal: 20,
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: 'white'
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 5,
//     color: '#023020'
//   },
//   attraction: {
//     fontSize: 16,
//     marginLeft: 10,
//     color: 'white'
//   },
// });
