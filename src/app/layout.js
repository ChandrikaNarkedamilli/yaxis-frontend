import ChatWidget from '@/components/ChatWidget/ChatWidget';
import './globals.css';
import Navbar from '@/components/NavBar/NavBar';
import { CartProvider } from '@/CartContext';
import { AuthProvider } from '../AuthContext';

export const metadata = {
  title: 'Visa App',
  description: 'Visa services application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <AuthProvider> 
            <Navbar />
            <CartProvider>{children}</CartProvider>
            <ChatWidget />
          </AuthProvider>
        <ChatWidget />
      </body>
    </html>
  );
}