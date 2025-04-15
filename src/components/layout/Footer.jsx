
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img 
              src="/public/unmask-logo-main.png" 
              alt="Unmask Protocol Logo" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                console.error("Footer logo failed to load:", e);
                e.target.src = "/placeholder.svg";
              }}
            />
          </div>
          <p className="text-gray-400 mb-4">
            Blockchain security platform protecting users from scams and verifying legitimate projects.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/rugid" className="hover:text-blue-400 transition-colors">RugID</Link></li>
            <li><Link to="/report" className="hover:text-blue-400 transition-colors">Scam Reporting</Link></li>
            <li><Link to="/register" className="hover:text-blue-400 transition-colors">Project Registration</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Security Tools</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
            <li><Link to="/api" className="hover:text-blue-400 transition-colors">API Access</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Blog</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Unmask Protocol. All rights reserved.</p>
        <p className="mt-2 text-xs opacity-50 hover:opacity-80 transition-opacity">
          <Link to="/login" className="text-gray-500 hover:text-gray-400">Protection</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
