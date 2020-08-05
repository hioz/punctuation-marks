import React, { useState } from 'react';
import './App.css';
import json from './data.json';

type DataType = { [index: string]: string };

const origData: DataType = json;

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(origData);

  const handleKeyPress = (_e: React.KeyboardEvent<HTMLInputElement>) => {
    setSearch('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const newData: DataType = {};
      const newText = origData[value];
      if (newText) {
        newData[value] = newText;
      } else {
        newData[''] = "It's not a punctuation mark";
      }
      setData(newData);
    } else {
      setData(origData);
    }
  };

  return (
    <div className="app">
      <header>
        <Search
          value={search}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
        />
      </header>
      <main>
        <Content data={data} />
      </main>
    </div>
  );
}

type SearchProps = {
  value: string;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Search({ value, onKeyPress, onChange }: SearchProps) {
  return (
    <input
      type="search"
      className="search"
      value={value}
      onKeyPress={onKeyPress}
      onChange={onChange}
      maxLength={1}
      autoFocus={true}
      placeholder="search"
    />
  );
}

type ContentProps = {
  data: DataType;
};

function Content({ data }: ContentProps) {
  return (
    <>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="line">
          {k && <span className="mark">{k}</span>}
          <span>{v}</span>
        </div>
      ))}
    </>
  );
}

export default App;
