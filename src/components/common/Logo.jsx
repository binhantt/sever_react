import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 40, showText = true, variant = 'dark' }) => {
  const gradients = {
    dark: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
    light: 'linear-gradient(135deg, #ffffff 0%, #e6e9f0 100%)',
    primary: 'linear-gradient(135deg, #2152ff 0%, #21d4fd 100%)',
    success: 'linear-gradient(135deg, #17ad37 0%, #98ec2d 100%)',
  };

  const textColors = {
    dark: 'text-white',
    light: 'text-dark',
    primary: 'text-white',
    success: 'text-white',
  };

  return (
    <Link 
      to="/" 
      className={`d-flex align-items-center text-decoration-none ${textColors[variant]}`}
    >
      <div className="d-flex align-items-center">
        <div 
          className="rounded d-flex align-items-center justify-content-center"
          style={{ 
            width: `${size}px`,
            height: `${size}px`,
            background: gradients[variant],
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div 
            className="position-absolute"
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 30% 107%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)',
            }}
          />
          <span 
            className="fw-bold " 
            style={{ 
              fontSize: `${size/2}px`,
              letterSpacing: '-1px',
              position: 'relative',
              zIndex: 1
            }}
          >
            A
          </span>
        </div>
        {showText && (
          <div className="ms-2 d-flex flex-column">
            <span className="fw-bold text-black" style={{ fontSize: `${size/2.5}px`, letterSpacing: '-0.5px' }}>
              Architect
            </span>
            <span 
              className="text-uppercase text-black"   
              style={{ 
                fontSize: `${size/5}px`, 
                opacity: 0.8,
                letterSpacing: '1px'

              }}
            >
              Admin Dashboard
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo; 