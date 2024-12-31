import React from 'react';
import { useAuth } from '../context/AuthContext';

const ModeratorDashboard = () => {
    const {user, loading } = useAuth();

     console.log();

    if (loading) {
      return <div>loading...</div>;
    }
  
   
};

export default ModeratorDashboard;