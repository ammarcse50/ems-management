// hooks/useSalaries.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSalaries = async (baseUrl) => {
  const res = await axios.get(`${baseUrl}/api/salary/getAllSalaries`);
  return res.data;
};

 const useSalaries = ({ baseUrl, user, loading }) => {
  return useQuery({
    queryKey: ['salaries'],
    queryFn:()=> fetchSalaries(baseUrl),
    enabled: !!user && !loading,
  });
};

export default useSalaries;
