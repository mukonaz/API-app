import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const Home = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const BASE_URL = 'http://192.168.1.132:3000';

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handlePayPress = async () => {
    try {
      setLoading(true);

      const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Test Store',
        paymentIntentClientSecret: paymentIntent,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        allowsDelayedPaymentMethods: false,
        appearance: {
          colors: {
            primary: '#000000',
          },
        },
      });

      if (initError) {
        Alert.alert('Error', initError.message);
        return;
      }

      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Error', paymentError.message);
      } else {
        Alert.alert('Success', 'Payment complete!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product: your soul</Text>
      <Text style={styles.price}>Price: R10.00</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Pay Now" onPress={handlePayPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Home;