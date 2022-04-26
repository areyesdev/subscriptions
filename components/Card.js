import React from 'react';

export default function Card() {
  return (
    <>
      <div className='card'>
        <div
          className='cover'
          style={{
            background:
              'url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)',
          }}
        >
          <h1 className='title'>Netflix</h1>
          <div className='tags'>
            <span className='tag'>#netflix</span>
            <span className='tag'>#movies</span>
          </div>
        </div>
        <div className='content'>
          <div className='subscription'>
            <span className='price'>34.000 COP</span>
            <span className='time'>/mo</span>
          </div>
          <div className='credit-card'>
            <div className='credit-card-number'>1234</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          box-shadow: 0 10px 15px -3px rgba(0 0 0 / 0.1),
            0 4px 6px -4px rgba(0 0 0 / 0.1);
          width: 350px;
          display: flex;
          flex-direction: column;
        }
        .cover {
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #fff;
          padding: 10px 20px 20px;
          border-radius: 4px 4px 0 0;
          background-size: cover;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
        }
        .tags {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          margin-top: 10px;
        }
        .tag {
          background: #475569;
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 12px;
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
        }
        .content {
          displat: flex;
          flex-direction: column;
          padding: 20px;
        }
        .subscription {
          display: flex;
          align-items: center;
          font-size: 32px;
          font-weight: bold;
        }
        .price {
          color: #111827;
          margin-right: 10px;
        }
        .time {
          color: #6b7288;
          font-size: 28px;
        }
        .credit-card {
          margin-top: 20px;
        }
        .credit-card-number {
          font-weight: bold;
          color: #374151;
        }
      `}</style>
    </>
  );
}
