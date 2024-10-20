import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Typography, Container, Paper, Grid, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from "../navbar/Navbar"; // Import the Navbar

const JobList = () => {
 const [jobs, setJobs] = useState([]);
 const [error, setError] = useState(null);
 const token = useSelector((state) => state.token);
 const navigate = useNavigate();

 useEffect(() => {
 const fetchJobs = async () => {
 try {
 const response = await axios.get('http://localhost:3001/api/job-posts', {
 headers: {
 Authorization: `Bearer ${token}`,
 },
 });
 
 // Reverse the jobs array to display the most recent ones first
 const jobsArray = Array.isArray(response.data) ? response.data.reverse() : [];
 setJobs(jobsArray);
 setError(null);
 } catch (error) {
 console.error('Error fetching jobs:', error);
 setError('Failed to fetch jobs. Please try again later.');
 setJobs([]);
 }
 };
 
 fetchJobs();
 }, [token]);
 

 const handleAddJobClick = () => {
 navigate('/job-form');
 };

 return (
 <Box>
 <Navbar />
 <Container sx={{ mt: 3 }}>
 <Grid container spacing={3}>
 {/* Left Sidebar */}
 <Grid item xs={12} sm={4} md={3}>
 <Paper elevation={3} sx={{ p: 2, minHeight: '200px',}}>
 <Typography variant="h6" gutterBottom>
 My Job Offers
 </Typography>
 <Button
 variant="contained"
 fullWidth
 onClick={handleAddJobClick}
 sx={{ bgcolor: 'hashtag#42b0e8', mb: 2 }}
 >
 Add Job
 </Button>
 <Typography variant="body2"
 sx={{ mt: 'auto', fontStyle: 'italic', color: 'gray', alignSelf: 'flex-end' }}>
 "Success is where preparation and opportunity meet."
 </Typography>
 </Paper>
 </Grid>

 {/* Main Content - Job Listings */}
 <Grid item xs={12} sm={8} md={9}>
 <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
 <Typography variant="h5">New Job Offers</Typography>
 </Paper>

 {error && (
 <Typography color="error" sx={{ mb: 2 }}>
 {error}
 </Typography>
 )}

 {(!Array.isArray(jobs) || jobs.length === 0) && !error ? (
 <Typography>No jobs available.</Typography>
 ) : (
 <Grid container spacing={2}>
 {jobs.map((job) => {
 return (
 <Grid item xs={12} key={job._id}>
 <Paper
 elevation={2}
 sx={{
 display: 'flex',
 alignItems: 'center',
 p: 2,
 mb: 2,
 }}
 >
 {/* Job Logo */}
 <Avatar
 src={
 job.companyLogo
 ? `http://localhost:3001/${job.companyLogo.replace(/\\/g, '/')}`
 : '/default-logo.png'
 }
 alt={`${job.company || 'Company'} Logo`}
 sx={{ width: 60, height: 60, mr: 2 }}
 />

 <Box sx={{ flexGrow: 1 }}>
 {/* Job Title */}
 <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
 {job.title}
 </Typography>

 {/* Company Name and Location */}
 <Typography variant="body1">
 {job.company || 'Unknown'} - {job.workPlace || 'Unknown'}
 </Typography>

 {/* Workplace Type and Promotion */}
 <Typography variant="body2" color="textSecondary">
 {job.workPlaceType || '-'} {job.isPromoted && ' - Promu(e)'}
 </Typography>
 </Box>

 {/* Promotion Label */}
 {job.isPromoted && (
 <Typography
 variant="caption"
 sx={{
 bgcolor: 'hashtag#ececec',
 px: 1,
 py: 0.5,
 borderRadius: 1,
 fontWeight: 'bold',
 mr: 2,
 }}
 >
 Promu(e)
 </Typography>
 )}

 {/* HR LinkedIn Button */}
 {job.rhLinkedIn && (
 <Button
 variant="outlined"
 size="small"
 href={job.rhLinkedIn}
 target="_blank"
 rel="noopener noreferrer"
 sx={{
 textTransform: 'none',
 ml: 2,
 }}
 >
 HR LinkedIn
 </Button>
 )}
 </Paper>
 </Grid>
 );
 })}
 </Grid>
 )}
 </Grid>
 </Grid>
 </Container>
 </Box>
 );
};

export default JobList;