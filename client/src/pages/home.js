import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Fab } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import Posts from '../components/Posts/Posts';
import { getPosts } from '../actions/posts';
import useStyles from './styleshome';
import memories from '../images/memories.png';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <Link to="/create" style={{ textDecoration: 'none', position: 'fixed', bottom: '20px', right: '30px' }}>
        <Fab className={classes.fab} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </Container>
  );
};

export default Home;
