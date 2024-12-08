import { StripeProvider } from '@stripe/stripe-react-native';
import Homescreen from './screens/Homescreen';

const App = () => (
  <StripeProvider publishableKey="pk_test_51Q7NSYExJqt3Kcq0MVlj8u5b5lvKsNgmpkvkhuZk5nY6Z7kfi4N7yFHcECwgWP9xrbNrwX6nytTiYhhysM8kbMND00KMJaP8z5">
    <Homescreen />
  </StripeProvider>
);

export default App;