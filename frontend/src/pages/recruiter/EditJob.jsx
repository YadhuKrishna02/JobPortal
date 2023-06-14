import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { EditJob } from '../../redux/recruiter/jobSlice';
import { toast } from 'react-hot-toast';

import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Chip,
  Autocomplete,
} from '@mui/material';

const useStyles = makeStyles(() => ({
  customButton: {
    backgroundColor: '#0067fc',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#0067fc',
      borderRadius: '10px',
    },
  },
}));

const validationSchema = Yup.object({
  jobTitle: Yup.string().required('Job title is required'),
  jobLocation: Yup.string().required('Job location is required'),
  jobType: Yup.string().required('Job type is required'),
  qualification: Yup.string().required('Qualification is required'),
  jobVacancies: Yup.number().required('Job level is required'),
  salary: Yup.string().required('Salary is required'),
  jobTiming: Yup.string().required('Job timing is required'),
  experience: Yup.string().required('Experience is required'),
  about: Yup.string().required('About is required'),
  essentialKnowledge: Yup.string().required('Essential knowledge is required'),
  deadline: Yup.string().required('Deadline is required'),
});

const JobPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const jobs = useSelector((state) => state?.jobs?.jobs);

  useEffect(() => {
    setSkills(filteredJobs[0]?.job?.skills || []);
  }, []);

  const filteredJobs = jobs.filter(
    (job) => job?.job?.jobTitle.toLowerCase().split(' ').join('-') === id
  );

  const jobId = filteredJobs[0]?.job._id;
  const date = filteredJobs[0]?.job?.deadline;
  const deadline = dayjs(date).format('YYYY-MM-DD');

  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      jobTitle: filteredJobs[0]?.job?.jobTitle || '',
      jobLocation: filteredJobs[0]?.job?.jobLocation || '',
      jobType: filteredJobs[0]?.job?.jobType || '',
      qualification: filteredJobs[0]?.job?.qualification || '',
      jobVacancies: filteredJobs[0]?.job?.jobVacancies || '',
      salary: filteredJobs[0]?.job?.salary || '',
      jobTiming: filteredJobs[0]?.job?.jobTiming || '',
      experience: filteredJobs[0]?.job?.experience || '',
      about: filteredJobs[0]?.job?.about || '',
      essentialKnowledge: filteredJobs[0]?.job?.essentialKnowledge || '',
      skills: filteredJobs[0]?.job?.skills || [],
      deadline: deadline || '',
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await dispatch(EditJob({ jobId, payload: values }));
        if (response?.payload?.status === 'success') {
          navigate('/recruiter/jobs');
          toast.success('Job edited successfully');
        }
      } catch (error) {
        // Handle error case
        console.log(error);
        toast.error('Error editing job');
      }
    },
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const handleDateChange = (event) => {
    const formattedDate = dayjs(event.target.value).format('YYYY-MM-DD');
    formik.setFieldValue('deadline', formattedDate);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== '') {
      const updatedSkills = [...formik.values.skills, skillInput.trim()];
      formik.setFieldValue('skills', updatedSkills);
      setSkills(updatedSkills);
      setSkillInput('');
    }
  };

  const handleSkillsInputChange = (event) => {
    setSkillInput(event.target.value);
  };

  const handleSkillRemove = (index) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills.splice(index, 1);
      formik.setFieldValue('skills', updatedSkills); // Update formik field value
      return updatedSkills;
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        Edit Job Post
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {formik.errors.companyLogo && (
              <Typography color="error" variant="body2">
                {formik.errors.companyLogo}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
              helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="jobLocation"
              name="jobLocation"
              label="Job Location"
              value={formik.values.jobLocation}
              onChange={formik.handleChange}
              error={
                formik.touched.jobLocation && Boolean(formik.errors.jobLocation)
              }
              helperText={
                formik.touched.jobLocation && formik.errors.jobLocation
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              id="jobType"
              name="jobType"
              options={['Full-time', 'Part-time', 'Internship']}
              value={formik.values.jobType || ''}
              onChange={(event, value) =>
                formik.setFieldValue('jobType', value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Job Type"
                  error={
                    formik.touched.jobType && Boolean(formik.errors.jobType)
                  }
                  helperText={formik.touched.jobType && formik.errors.jobType}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="qualification"
              name="qualification"
              label="Qualification"
              value={formik.values.qualification}
              onChange={formik.handleChange}
              error={
                formik.touched.qualification &&
                Boolean(formik.errors.qualification)
              }
              helperText={
                formik.touched.qualification && formik.errors.qualification
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="jobVacancies"
              name="jobVacancies"
              label="Job Vacancies"
              value={formik.values.jobVacancies}
              onChange={formik.handleChange}
              error={
                formik.touched.jobVacancies &&
                Boolean(formik.errors.jobVacancies)
              }
              helperText={
                formik.touched.jobVacancies && formik.errors.jobVacancies
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="salary"
              name="salary"
              label="Salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              id="jobTiming"
              name="jobTiming"
              options={['Flexible', 'Morning Shift', 'Night Shift']}
              value={formik.values.jobTiming || ''}
              onChange={(event, value) =>
                formik.setFieldValue('jobTiming', value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Job Timing"
                  error={
                    formik.touched.jobTiming && Boolean(formik.errors.jobTiming)
                  }
                  helperText={
                    formik.touched.jobTiming && formik.errors.jobTiming
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="experience"
              name="experience"
              label="Experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              error={
                formik.touched.experience && Boolean(formik.errors.experience)
              }
              helperText={formik.touched.experience && formik.errors.experience}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              multiline
              rows={5}
              id="about"
              name="about"
              label="About"
              value={formik.values.about}
              onChange={formik.handleChange}
              error={formik.touched.about && Boolean(formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              multiline
              rows={5}
              id="essentialKnowledge"
              name="essentialKnowledge"
              label="Essential Knowledge"
              value={formik.values.essentialKnowledge}
              onChange={formik.handleChange}
              error={
                formik.touched.essentialKnowledge &&
                Boolean(formik.errors.essentialKnowledge)
              }
              helperText={
                formik.touched.essentialKnowledge &&
                formik.errors.essentialKnowledge
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="skillInput"
              name="skills"
              label="Add skill "
              value={skillInput}
              onChange={handleSkillsInputChange}
              error={formik.touched.skills && Boolean(formik.errors.skills)}
              helperText={formik.touched.skills && formik.errors.skills}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSkill}
            >
              Add Skill
            </Button>
            <div style={{ marginTop: '8px' }}>
              {skills &&
                skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleSkillRemove(index)}
                    style={{ margin: '4px' }}
                  />
                ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="deadline"
              name="deadline"
              label="Deadline"
              type="date" // Use type="date" for date input
              value={formik.values.deadline}
              onChange={handleDateChange}
              error={formik.touched.deadline && Boolean(formik.errors.deadline)}
              helperText={formik.touched.deadline && formik.errors.deadline}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className={classes.customButton}
            >
              Edit Job
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default JobPostForm;
