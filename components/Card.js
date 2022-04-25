import React from 'react';

export default function Card() {
  return (
    <>
      <div className='card'>
        <div className='cover'>
          <h1 className='title'>Netflix</h1>
        </div>
        <div className='content'></div>
      </div>
      <style jsx>{`
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          box-shadow: 0 10px 15px -3px rgba(0 0 0 / 0.1),
            0 4px 6px -4px rgba(0 0 0 / 0.1);
        }
      `}</style>
    </>
  );
}
