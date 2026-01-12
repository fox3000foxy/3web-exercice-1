import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

console.log(React)

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function Counter() {
  // Counter state
  const [count, setCount] = useState(0);

  // Form state
  const [nameInput, setNameInput] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);

  // Expensive calculation state
  const [fibNumber, setFibNumber] = useState(10);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(0);

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedName(nameInput);
  };

  // Fetch posts on mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data.slice(0, 5))) // Get only first 5 posts
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  // Expensive calculation with useMemo (Fibonacci)
  const fibonacci = useMemo(() => {
    console.log('Calculating fibonacci for:', fibNumber);
    const fib = (n: number): number => {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    };
    return fib(fibNumber);
  }, [fibNumber]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Counter Section */}
      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Counter Application</h1>
        <div style={{ fontSize: '48px', margin: '20px 0', fontWeight: 'bold' }}>
          {count}
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={increase} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Increase
          </button>
          <button onClick={decrease} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Decrease
          </button>
          <button onClick={reset} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Reset
          </button>
        </div>
      </section>

      {/* Name Form Section */}
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Name Form</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter your name"
            style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
            Submit
          </button>
        </form>
        {submittedName && (
          <div style={{ padding: '10px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
            <strong>Submitted Name:</strong> {submittedName}
          </div>
        )}
      </section>

      {/* Posts Section */}
      <section style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Posts from API</h2>
        {posts.length === 0 ? (
          <p>Loading posts...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map(post => (
              <li key={post.id} style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <strong>{post.id}.</strong> {post.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Expensive Calculation Section */}
      <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Fibonacci Calculator (useMemo)</h2>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="fibInput" style={{ display: 'block', marginBottom: '10px' }}>
            Enter a number (0-40):
          </label>
          <input
            id="fibInput"
            type="number"
            min="0"
            max="40"
            value={fibNumber}
            onChange={(e) => setFibNumber(Number(e.target.value))}
            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', width: '100px' }}
          />
        </div>
        <div style={{ padding: '15px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
          <strong>Fibonacci({fibNumber}) =</strong> {fibonacci}
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            (Check console to see when calculation runs - it only recalculates when the input changes!)
          </p>
        </div>
      </section>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Counter />);
