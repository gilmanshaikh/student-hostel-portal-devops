
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AuthSelect from './pages/AuthSelect';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import HostelList from './pages/HostelList';
import HostelDetail from './pages/HostelDetail';
import MyApplications from './pages/MyApplications';
import AddHostel from './pages/AddHostel';
import AdminApplications from './pages/AdminApplications';
import StudentProfile from './pages/StudentProfile';
import AdminProfile from './pages/AdminProfile';
import AdminDashboard from './pages/AdminDashboard';
import MyHostels from './pages/MyHostels';
import EditHostel from './pages/EditHostel';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {/* DevOps Engineered Premium Release Banner */}
          <div style={{ 
            backgroundColor: '#10b981', 
            color: '#ffffff', 
            textAlign: 'center', 
            padding: '8px 0', 
            fontSize: '14px', 
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>
            🚀 HOSTELHUB PREMIUM PORTAL v1.1.0 • LIVE STAGING DEPLOYMENT
          </div>

          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth-select" element={<AuthSelect />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/hostels" element={<HostelList />} />
            <Route path="/hostels/:id" element={<HostelDetail />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-hostel" element={<AddHostel />} />
            <Route path="/admin/my-hostels" element={<MyHostels />} />
            <Route path="/admin/edit-hostel/:id" element={<EditHostel />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;