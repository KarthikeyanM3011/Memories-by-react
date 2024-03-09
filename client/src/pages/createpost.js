import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import Form from '../components/Form/Form';

function CreatePost() {
  const [currentId, setCurrentId] = useState(0); // Define currentId state

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center">Create New Post</Typography>
      <Form currentId={currentId} setCurrentId={setCurrentId} /> {/* Pass setCurrentId as a prop */}
    </Container>
  );
}

export default CreatePost;
