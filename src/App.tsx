import * as React from 'react';
import Form from './components/Form';
import './style.css';

export default function App() {
  return (
    <div className="appContainer">
      <div className="backgroundCover">
        <div className="cover">
          <h1>
            <span>Lorem ipsum dolor si amet</span> consectetur
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      <Form />
    </div>
  );
}
