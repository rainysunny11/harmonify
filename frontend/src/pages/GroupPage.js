import React from 'react';
import './Pages.css';
import Footer from '../components/footer';

const GroupPage = () => {
  return (
    <div className="container">
      <div className="page-title">
        <h2>Group Session</h2>
      </div>
      
      <div className="y2k-container">
        <h3 className="y2k-heading">Create Group Session</h3>
        <p>This is a placeholder for the group statistics page where users can compare their music taste with friends or see aggregate statistics.</p>
        
        <div className="text-center py-4">
          <p>Coming soon! This feature is currently in development.</p>
          <div className="mt-3">
            <img 
              src="/placeholder-group.png" 
              alt="Group feature coming soon"
              style={{ maxWidth: '300px', opacity: 0.7 }}
              onError={e => e.target.style.display = 'none'}
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default GroupPage;