import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Users } from './components/testUsers';
import { TestUsers } from './components/testUsers';
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TestUsers />);
