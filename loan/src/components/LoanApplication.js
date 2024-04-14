import React, { useState } from 'react';

function LoanApplication() {
  const [taxID, setTaxID] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [amountRequested, setAmountRequested] = useState('');
  const [loanDecision, setLoanDecision] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taxID,
          businessName,
          amountRequested
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setLoanDecision(responseData.decision);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div className='App-container'>
        <form onSubmit={handleSubmit}>
        <label>
            Tax ID:
            <input type="text" value={taxID} onChange={(e) => setTaxID(e.target.value)} />
        </label>
        <br />
        <label>
            Business Name:
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
        </label>
        <br />
        <label>
            Amount Requested:
            <input type="text" value={amountRequested} onChange={(e) => setAmountRequested(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
        {loanDecision && <div className='App-alert'>Loan Decision: {loanDecision}</div>}
        </form>
    </div>
  );
}

export default LoanApplication;
