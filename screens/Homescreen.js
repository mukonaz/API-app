import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const Home = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch('https://localhost:3000/payment-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }),
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();
      return { paymentIntent, ephemeralKey, customer };
    } catch (error) {
      console.error("Error fetching payment sheet params:", error);
    }
  };
  
  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();
    if (!paymentIntent || !ephemeralKey || !customer) {
      alert("Failed to fetch payment parameters");
      return;
    }
    
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerEphemeralKeySecret: ephemeralKey,
      customerId: customer,
    });
    
    if (error) {
      console.error("Error initializing payment sheet:", error);
      alert("Payment initialization failed");
    } else {
      openPaymentSheet();
    }
  };
  
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      console.error("Error presenting payment sheet:", error);
      alert(`Error: ${error.message}`);
    } else {
      alert("Payment successful!");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product: Your soul</Text>
      <Text style={styles.price}>Price: R100.00</Text>
      <Button title="Pay" onPress={initializePaymentSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  price: { fontSize: 18, marginVertical: 10 },
});

export default Home;