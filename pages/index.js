import Head from 'next/head';
import { useEffect, useState } from 'react';

import CardSubscription from '../components/CardSubscription';
import Subtitle from '../components/Subtitle';
import Price from '../components/Price';
import CreditCard from '../components/CreditCard';
import Filter from '../components/Filter';

import {
  getMonthlySubscriptionGrouppedByCard,
  getSummaryData,
  getUsdPrice,
} from '../helpers';

import { CREDIT_CARD_TYPES } from '../constants';

import subscriptions from '../data/subscriptions.json';

import { TIME_ATTRIBUTE } from '../constants';
import useCurrencyExchangeRates from '../hooks/useCurrencyExchangeRates';

import useMedia from '../hooks/useMedia';

export default function Home() {
  const [time, setTime] = useState('YEARLY');
  const [currency, setCurrency] = useState('USD');
  const [sortBy, setSortBy] = useState('PRICE');
  const [card, setCard] = useState('');
  const isDesktop = useMedia(['(min-width: 992px)'], [true]);

  const { rates } = useCurrencyExchangeRates();
  const grouppedMonthlySubscriptions = getMonthlySubscriptionGrouppedByCard(
    subscriptions,
    currency,
    rates
  );

  const [cards, setCards] = useState(Object.keys(grouppedMonthlySubscriptions));

  const summaryData = getSummaryData(grouppedMonthlySubscriptions);

  // TODO: Move to a helper function
  const summaryTotal = summaryData.reduce(
    (total, data) => {
      total.monthly = total.monthly + data.monthly.price;
      total.yearly = total.yearly + data.yearly.price;

      return total;
    },
    { monthly: 0, yearly: 0 }
  );

  return (
    <>
      <Head>
        <title>Subscriptions</title>
        <meta
          name='description'
          content='Keep your subscriptions summary in one place'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/jgthms/minireset.css@master/minireset.min.css'
        ></link>
      </Head>
      <nav>
        <section className='row'>
          <Filter
            label='Sort by'
            value={sortBy}
            setValue={setSortBy}
            options={[
              { text: 'Price', value: 'PRICE' },
              { text: 'Name', value: 'NAME' },
              { text: 'Card', value: 'CARD' },
            ]}
          />
          <Filter
            label='Currency'
            value={currency}
            setValue={setCurrency}
            options={[
              { text: 'USD', value: 'USD' },
              { text: 'COP', value: 'COP' },
              { text: 'EUR', value: 'EUR' },
            ]}
          />

          <Filter
            label='Time'
            value={time}
            setValue={setTime}
            options={[
              { text: 'Yearly', value: 'YEARLY' },
              { text: 'Monthly', value: 'MONTHLY' },
            ]}
          />

          <Filter
            label='Cards'
            value={card}
            setValue={setCard}
            options={[
              { text: 'All', value: '' },
              ...cards.map((card) => ({
                text: `${card.split('_')[1]} (${
                  CREDIT_CARD_TYPES[card.split('_')[0]]
                })`,
                value: card,
              })),
            ]}
          />
        </section>
      </nav>
      <main className='container'>
        <section className='row'>
          {(isDesktop || time === 'MONTHLY') && (
            <article>
              <Subtitle>Total Monthly</Subtitle>
              <Price currency={currency} decimals={0} size='lg'>
                {summaryTotal.monthly}
              </Price>
            </article>
          )}
          {(isDesktop || time === 'YEARLY') && (
            <article>
              <Subtitle>Total Yearly</Subtitle>
              <Price currency={currency} decimals={0} size='lg'>
                {summaryTotal.yearly}
              </Price>
            </article>
          )}
        </section>

        <section>
          <Subtitle>Cards {time}</Subtitle>
          <div className='cards-container'>
            {summaryData.map((data) => {
              return (
                <CreditCard
                  key={data.key}
                  number={data.creditCard.number}
                  type={data.creditCard.type}
                  currency={data[TIME_ATTRIBUTE[time]].currency}
                  price={data[TIME_ATTRIBUTE[time]].price}
                  decimals={0}
                />
              );
            })}
          </div>
        </section>

        <section>
          <Subtitle>Subscriptions</Subtitle>
          <div className='cards-container'>
            {subscriptions
              .filter(({ creditCard }) => {
                if (card) {
                  return `${creditCard.type}_${creditCard.number}` === card;
                }

                return true;
              })
              .sort((a, b) => {
                if (sortBy === 'NAME') {
                  return a.title.localeCompare(b.title);
                } else if (sortBy === 'PRICE') {
                  return (
                    Number(
                      getUsdPrice(
                        b.time === 'MONTHLY' ? b.price * 12 : b.price,
                        b.currency,
                        rates
                      )
                    ) -
                    Number(
                      getUsdPrice(
                        a.time === 'MONTHLY' ? a.price * 12 : a.price,
                        a.currency,
                        rates
                      )
                    )
                  );
                } else if (sortBy === 'CARD') {
                  return a.creditCard.number - b.creditCard.number;
                }

                return 0;
              })
              .map((subscription) => {
                return (
                  <CardSubscription
                    key={subscription.title}
                    unsplashId={subscription.unsplashId}
                    title={subscription.title}
                    tags={subscription.tags}
                    currency={subscription.currency}
                    creditCard={subscription.creditCard}
                    time={subscription.time}
                    price={subscription.price.toFixed(2)}
                  />
                );
              })}
          </div>
        </section>
      </main>

      <style jsx>{`
        article,
        section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        nav {
          background: #e11d48;
          padding: 12px 20px;
        }
        .row {
          flex-direction: row;
          flex-wrap: wrap;
          gap: 20px 30px;
        }
        .evenly {
          justify-content: space-evenly;
        }
        .cards-container {
          width: 100%;
          min-height: 100%;
          display: grid;
          gap: 30px;
          place-content: center;
          grid-template-columns: minmax(300px, 1fr);
        }
        .container {
          height: 100%;
          width: 100%;
          max-width: 800px;
          padding: 20px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .summary {
          width: 100%;
          position: fixed;
          bottom: 0;
          box-shadow: 0 -10px -15px 3px rgb(0 0 0 / 0.1),
            0 -4px -6px 4px rgb(0 0 0 / 0.1);
        }
        @media only screen and (min-width: 800px) {
          .container {
            max-width: 900px;
          }
          .cards-container {
            grid-template-columns: repeat(2, minmax(300px, 1fr));
          }
        }
        @media only screen and (min-width: 1000px) {
          .container {
            max-width: 1310px;
          }
          .cards-container {
            grid-template-columns: repeat(3, minmax(300px, 1fr));
          }
        }
      `}</style>
    </>
  );
}
