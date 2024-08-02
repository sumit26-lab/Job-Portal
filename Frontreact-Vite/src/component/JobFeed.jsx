import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobItem from './JobItem';
import { Filters } from './pages/SearchBar';

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    title: '',
    keywords: '',
    company: '',
    location: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.example.com/jobs', { params: searchParams });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  return (
    <div className="flex-1 p-4">
      <Filters onSearch={(params) => setSearchParams(params)} />
      {loading ? <p>Loading...</p> : jobs.map(job => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobFeed;
