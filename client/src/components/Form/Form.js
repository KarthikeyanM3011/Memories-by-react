import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
      window.location.href = '/home';
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Container component="main" maxWidth="sm" style={{ borderRadius: '20px', background: 'linear-gradient(to right, #c9d6ff, #e2e2e2)', position: 'fixed', top: '130px', left: '470px' }}>
      <div className={classes.paper} id="whole">
        <Typography component="h1" variant="h5">
          {currentId ? `Editing "${post.title}"` : 'Creating a Memory'}
        </Typography><br />
        <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            </Grid>
            <Grid item xs={12}>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
            </Grid><br />
          </Grid>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      </div>
    </Container>
  );
};

export default Form;
