// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/login', {
//                 username,
//                 password,
//             }, { withCredentials: true });
//             console.log('Login successful', response.data);
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Username:
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//             </label>
//             <label>
//                 Password:
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//             </label>
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default Login;