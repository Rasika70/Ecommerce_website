import React, { useState } from 'react';
import axios from 'axios';

const NewsletterSender = () => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // const handleSendNewsletter = async () => {
  //   try {
  //     // Validate form fields
  //     const getToken = localStorage.getItem('token');
  //     if (!subject || !content) {
  //       setError('Subject and content are required');
  //       return;
  //     }

  //     // Make a POST request to your backend to send the newsletter
  //     await axios.post('/api/v1/admin/send-newsletter', { subject, content },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${getToken}`,
  //         },
  //       });

  //     // Update state to indicate successful sending
  //     setSuccess(true);
  //     setError('');
  //   } catch (err) {
  //     // Handle errors, e.g., if the subject or content is missing
  //     setError('Failed to send newsletter. Please try again.');
  //   }
  // };
  const handleSendNewsletter = async () => {
    try {
        const getToken = localStorage.getItem('token');

        // Debug: Log values before sending request
        console.log("Sending newsletter with subject:", subject);
        console.log("Content:", content);
        console.log("Token:", getToken);

        if (!subject || !content) {
            setError('Subject and content are required');
            return;
        }

        // Send request to backend
        const response = await axios.post(
            'http://localhost:5000/api/v1/admin/send-newsletter', // Ensure the correct backend URL
            { subject, content },
            {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Response:", response.data); // Debug: Check server response

        setSuccess(true);
        setError('');
    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message); // Debug errors
        setError('Failed to send newsletter. Please try again.');
    }
};

  return (
    <div className="newsletter-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Send Newsletter to Users</h2>
      {success ? (
        <h4>Newsletter sent successfully!</h4>
      ) : (
        <div className='border ronded shadow' style={{ width: '350px', height: '300px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <div className='newsletter-input-content' style={{ paddingTop: '30px' }}>
            <div className="form-group" style={{ paddingLeft: '26px' }}>
              <label htmlFor="subject">Subject: </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: '250px' }}
              />
            </div>
            <div className="form-group" style={{ paddingLeft: '25px' }}>
              <label htmlFor="content">Content: </label>
              <textarea
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                style={{ width: '250px' }}
              />
            </div>
          </div>
        </div>
      )}
      <div className='newsletter-btn'>
        <button onClick={handleSendNewsletter} style={{ width: '150px', height: '40px' }}>Send Newsletter</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>

  )
};

export default NewsletterSender;
