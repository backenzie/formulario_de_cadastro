import { Toaster } from 'react-hot-toast';
import AuthProvider from './context/AuthContext';
import { RoutesMain } from './routes';

function App() {
  return (
    <AuthProvider>
      <RoutesMain />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
