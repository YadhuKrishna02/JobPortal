import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import PageNotFound from './pages/PageNotFound';
import UserRoutes from './routes/userRoutes';
import AdminRoutes from './routes/adminRoutes';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorBoundary/ErrorBoundary';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary
        fallbackRender={ErrorFallback}
        onReset={() => alert('Error boundary reset')}
      >
        <Toaster />
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/recruiter/*" element={<AdminRoutes />} />
            <Route path="/*" element={<UserRoutes />} /> {/* User section */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
