import React, { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', role: 'student' });

  // Load user and courses on mount
  useEffect(() => {
    checkUser();
    fetchCourses();
  }, []);

  // Check if user is logged in
  const checkUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        credentials: 'include'
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (err) {
      console.log('No user logged in');
    }
  };

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        setLoginData({ email: '', password: '' });
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
        credentials: 'include'
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        setRegisterData({ name: '', email: '', password: '', role: 'student' });
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      alert('Registration failed');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
        credentials: 'include'
      });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Create new course
  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
        credentials: 'include'
      });

      if (res.ok) {
        const course = await res.json();
        setCourses([course, ...courses]);
        setNewCourse({ title: '', description: '' });
      } else {
        alert('Failed to create course');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🎓 EduTrack LMS</h1>
        <nav>
          {!user ? (
            <div className="auth-buttons">
              <button onClick={() => document.getElementById('loginModal').style.display = 'block'}>Login</button>
              <button onClick={() => document.getElementById('registerModal').style.display = 'block'}>Register</button>
            </div>
          ) : (
            <div className="user-menu">
              <span>Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <button onClick={() => document.getElementById('courseModal').style.display = 'block'}>
                  Add Course
                </button>
              )}
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section className="courses">
          <h2>Available Courses</h2>
          <div className="course-grid">
            {courses.map(course => (
              <div key={course._id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button>Enroll Now</button>
              </div>
            ))}
          </div>
        </section>

        {user && user.role === 'admin' && (
          <section className="admin-panel">
            <h2>Admin Panel</h2>
            <p>Manage users, courses, and content</p>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2025 EduTrack LMS. All rights reserved.</p>
      </footer>

      {/* Login Modal */}
      <div id="loginModal" className="modal">
        <div className="modal-content">
          <span onClick={() => document.getElementById('loginModal').style.display = 'none'}>&times;</span>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      {/* Register Modal */}
      <div id="registerModal" className="modal">
        <div className="modal-content">
          <span onClick={() => document.getElementById('registerModal').style.display = 'none'}>&times;</span>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
            />
            <select
              value={registerData.role}
              onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>

      {/* Add Course Modal */}
      <div id="courseModal" className="modal">
        <div className="modal-content">
          <span onClick={() => document.getElementById('courseModal').style.display = 'none'}>&times;</span>
          <h2>Add New Course</h2>
          <form onSubmit={createCourse}>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              required
            ></textarea>
            <button type="submit">Create Course</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .app {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        nav button {
          margin-left: 10px;
        }
        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .course-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          padding: 20px;
        }
        .modal {
          display: none;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.4);
        }
        .modal-content {
          background-color: #fff;
          margin: 15% auto;
          padding: 20px;
          border: 1px solid #888;
          width: 300px;
          border-radius: 8px;
          position: relative;
        }
        .modal-content span {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
        }
        input, textarea, select, button {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 16px;
        }
        button {
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default App;