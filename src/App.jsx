import AuthProvider from './context/AuthContext';
import { RoutesMain } from './routes';

function App() {
  return (
    <AuthProvider>
      <RoutesMain />
    </AuthProvider>
  );
}

export default App;
