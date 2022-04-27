import React from 'react';

export default function Card({
  cover,
  title,
  tags,
  price,
  currency,
  time,
  creaditCard,
}) {
  return (
    <>
      <div className='card'>
        <div
          className='cover'
          style={{
            backgroundImage: `url(${cover})`,
          }}
        >
          <h1 className='title'>{title}</h1>
          <div className='tags'>
            {tags.map((tag) => {
              return (
                <span className='tag' key={tag}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className='content'>
          <div className='subscription'>
            <span className='price'>
              {price} {currency}
            </span>
            <span className='time'>{time === 'MONTHLY' ? '/mo' : 'year'}</span>
          </div>
          <div className='credit-card'>
            <span className='icon'>
              <img
                src={`/icons/${
                  creaditCard.type === 'VISA' ? 'visa' : 'mastercard'
                }.svg `}
              />
            </span>
            <div className='credit-card-number'>{creaditCard.number}</div>
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
          position: relative;
          height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #fff;
          padding: 10px 20px 20px;
          border-radius: 4px 4px 0 0;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .cover::before {
          content: '';
          position: absolute;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 65%)
          inset: 0;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          position: relative;
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
        }
        .tags {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          margin-top: 10px;
          position: relative;
        }
        .tag {
          background: #475569;
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 12px;
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
          text-transform: capitalize;
        }
        .content {
          displat: flex;
          flex-direction: column;
          padding: 20px;
        }
        .subscription {
          display: flex;
          align-items: center;
          font-size: 24px;
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
          display: flex;
          gap: 5px;
          align-items: center;
          margin-top: 20px;
        }
        .credit-card .icon {
          width: 30px;
          line-height: 0;
        }
        .credit-card .icon img {
          width: 100%;
        }
        .credit-card-number {
          font-weight: bold;
          color: #374151;
        }
      `}</style>
    </>
  );
}
