import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './Sandbox.css';

const Sandbox = ({ userId }) => {
  const [code, setCode] = useState('');
  const [isCodeRunning, setIsCodeRunning] = useState(false);

  //acknowledge end
  const handleAcknowledgeEnd = async () => {
    setIsCodeRunning(true); 
  };

  const saveSandbox = async (output) => {
    try {
      // Remove the code part from the output
      const cleanedOutput = output.replace(/document.write\(['"](.*?)['"]\);?/, '$1');

      const response = await axios.post('http://localhost:5000/api/sandbox', {
        userId: userId,
        code: code,
        output: cleanedOutput || '' 
      });
      console.log(response.data); // debug
      alert('Sandbox saved successfully!');
    } catch (error) {
      console.error('Error saving sandbox:', error);
    }
  };

  
  useEffect(() => {
    if (isCodeRunning) {
      // Get the iframe element
      const iframe = document.getElementById('sandbox-output');

      // Clear the content of the iframe's document
      iframe.contentWindow.document.body.innerHTML = '';

      // Execute the code in the iframe
      iframe.contentWindow.eval(code);

      // Extract the output from the iframe's document
      const output = iframe.contentWindow.document.body.textContent;

      // Save the sandbox with the extracted output
      saveSandbox(output);
    }
  }, [isCodeRunning]);

  return (
    <div className="sandbox-container">
      <div className="sandbox-editor">
        <MonacoEditor
          height="500px"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={setCode}
        />
      </div>
      <div className="sandbox-output">
        <h2>Output</h2>
        <button onClick={handleAcknowledgeEnd}>Save Sandbox</button>
        <iframe
          id="sandbox-output"
          title="sandbox-output"
          className="output-frame"
          srcDoc={`<html><body></body></html>`} // Start with an empty document
        ></iframe>
      </div>
    </div>
  );
};

export default Sandbox;