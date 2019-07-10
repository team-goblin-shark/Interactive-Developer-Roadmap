import React, { Component, useState, useEffect } from 'react';

// TODO refactor using hooks

const ResourceHooks = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(` COUNT -> ${count}`);
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
} 

export default ResourceHooks;
