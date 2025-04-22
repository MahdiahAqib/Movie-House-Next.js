// pages/api/movies.js
import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    
    res.status(200).json(data); // Send the JSON data as the response
  } catch (error) {
    res.status(500).json({ message: 'Failed to load data' });
  }
}
