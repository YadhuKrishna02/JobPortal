import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Button,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 400,
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const FilterModal = ({ onFilter }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [salaryFilter, setSalaryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = () => {
    const filters = {
      salary: salaryFilter,
      location: locationFilter,
      jobTitle: jobTitleFilter,
    };
    onFilter(filters);
    handleClose();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem',
      }}
    >
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <FilterListIcon />
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="filter-modal"
        aria-describedby="filter-modal-description"
      >
        <div className={classes.modalContent}>
          <h2 id="filter-modal">Filter Jobs</h2>
          <FormControl className={classes.formControl}>
            <InputLabel id="salary-filter-label">Salary</InputLabel>
            <Select
              labelId="salary-filter-label"
              id="salary-filter"
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="$0 - $500">$0 - $500</MenuItem>
              <MenuItem value="$500 - $1000">$500 - $1000</MenuItem>
              <MenuItem value="$1000+">$1000+</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            fullWidth
          />
          <TextField
            label="Job Title"
            value={jobTitleFilter}
            onChange={(e) => setJobTitleFilter(e.target.value)}
            fullWidth
          />
          <div
            className={classes.buttonContainer}
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button variant="contained" color="primary" onClick={handleFilter}>
              Refine Jobs
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FilterModal;
