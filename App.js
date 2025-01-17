import { StripeProvider } from '@stripe/stripe-react-native';
import Homescreen from './screens/Homescreen';

const App = () => (
  <StripeProvider publishableKey="?????">
    <Homescreen />
  </StripeProvider>
);

export default App;