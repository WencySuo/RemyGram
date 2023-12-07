// PostForm.js
import React, { useState } from 'react';

const PostForm = ({ onPostSubmit }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostSubmit(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message:
        <input type="text" value={message} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit Post</button>
    </form>
  );
};

export default PostForm;
