import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { userNavigate } from 'react-router-dom';

export default function RegisterForm({ onSwitch, onMessage }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onMessage('');
    setLoading(true);

    // const navigate = useNavigate();

    try {
      const response = await axios.post('https://localhost:7071/register', {
        username,
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      onMessage(`Success: ${JSON.stringify(response.data)}`);
      // navigate('/dashboard')

    } catch (error) {
      onMessage('Error when registering');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            
            <input 
            type="text" 
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-full border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="email" 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full border border-gray-300 rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="password" 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <button 
            disabled={loading}
            type='submit'
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            {loading ? 'Registering...' : 'Register'}
            </button>
            
        <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Button
            type="button"
            className="text-blue-600 underline"
            onClick={onSwitch}
            disabled={loading}
            >
            Login
            </Button>
        </p>
        </div>
        </div>
    </form>

  );
}
