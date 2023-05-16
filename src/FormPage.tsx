
import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const FormPage = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && phoneNumber && email) {
      const userDetails = { name, phoneNumber, email };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      window.location.href = '/second-page';
    } else {
      window.location.href = '/?message=Please enter all details';
    }
  };
  useEffect(() => {
    console.log(location)
    if (location.search) {
      alert(location.search?.split('=')[1].replaceAll('%20',' '));
    }
  }, [location.state]);


  

  return (
    <div>
      <h2>Form Page</h2>
      {location.state && location.state.message && (
        <p style={{ color: 'red' }}>{location.state.message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
