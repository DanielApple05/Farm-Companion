import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getFarmManagementTips } from '../api/farmKnowledge';

const FarmKnowledgeDaily = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await getFarmManagementTips();
        console.log('Fetched general farm management tips:', response.data);
        setTips(response.data);
      } catch (error) {
        console.error('Error fetching general farm management tips:', error);
      }
    };

    fetchTips();
  }, []);

  return (
    <div>
      <h2>General Farm Management Tips</h2>
      <ul>
        {tips.slice(1, 5).map((tip) => (
          <li key={tip.id}>
            <h3>{tip.title}</h3>
            <p>{tip.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FarmKnowledgeDaily;
