import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';

// Since the prompt asks for a complete structure but implies a single page scrollable layout 
// for sections like "About", "Services" etc based on the provided menu anchors (#about),
// we will structure the Main Home page to contain all these sections.
// However, the router is set up to allow expansion for dedicated pages if needed in the future.

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future routes can be added here, e.g., <Route path="/exames" element={<ExamsPage />} /> */}
      </Routes>
    </HashRouter>
  );
};

export default App;