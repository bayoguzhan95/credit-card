import { useState } from 'react';
import InputMask from 'react-input-mask';
import creditCardType from 'credit-card-type';

export default function Home() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [date, setDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [backFace, setBackFace] = useState(false);
  let type = false;

  const handleClick = (e) => {
    e.preventDefault();
  };

  if (cardNumber) {
    type = creditCardType(cardNumber)?.[0]?.type;
  } else {
    type = false;
  }

  return (
    <div className='container'>
      <div className={`${backFace && 'flip'}  card`}>
        <div className='front'>
          <div className='card-top'>
            <img src='/chips.svg' alt='' />
            {type === 'mastercard' && (<img src='/master.svg' alt='' />)}
            {type === 'visa' && (<img src='/visa.svg' alt='' />)}
          </div>
          <div className='card-number'> {cardNumber || '****  **** **** ****'} </div>
          <div className='card-bottom'>
            <div>
              <div className='key'>Card Holder Name</div>
              <div className='value'> {cardName || '***'} </div>
            </div>
            <div>
              <div className='key'>Expiry Date</div>
              <div className='value'> {date || '****'} </div>
            </div>
          </div>
        </div>
        <div className='back'>
          <div className='card-back'>
            CVV <em> {cvv || '***'} </em>{' '}
          </div>
        </div>
      </div>
      <div className='inputWrapper' >
      <h1>Card Info</h1>

      <InputMask className='inputs' mask="9999-9999-9999-9999" maskChar={null} onChange={(e) => setCardNumber(e.target.value)} type='text' value={cardNumber}  placeholder='Card Number'  /> <br />
      <input className='inputs' type='text' value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder='Card Owner' /> <br />
      <InputMask className='inputs' mask="99/99" maskChar={null} type='text' value={date} onChange={(e) => setDate(e.target.value)} placeholder='Expriy Time' /> <br />
      <InputMask className='inputs' mask="999" maskChar={null} type='text' value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder='CVV' onFocus={() => setBackFace(true)} onBlur={() => setBackFace(false)} /> <br />
      <div className='checkboxes' >
        <div> <input type='checkbox' onChange={(e) => setBackFace(e.target.checked)}  /></div>
        <div>Show the {backFace ? ( "back") : ("front")}</div>
      </div>
      <button className='button' onClick={handleClick} >Kaydet</button>
      </div>
    </div>
  );
}
