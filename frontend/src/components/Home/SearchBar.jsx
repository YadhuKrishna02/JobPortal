import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    width: '40%',
    margin: '0 auto',
    marginTop: '1rem',
    backgroundColor: '#D5D5D5', // Off-white color
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const SearchBar = ({ placeholder, onSearch }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    onSearch(searchValue);
  };

  return (
    <Paper className={classes.searchContainer} elevation={0}>
      <IconButton className={classes.searchIcon}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
      />
    </Paper>
  );
};

export default SearchBar;
