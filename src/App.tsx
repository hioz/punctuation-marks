import React, {
  useState,
  FC,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react';
import './App.css';
import json from './data.json';

type DataType = { [index: string]: string };

const origData: DataType = json;

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(origData);

  const handleKeyPress: KeyboardEventHandler = () => {
    setSearch('');
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const newData: DataType = Object.create(null);
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
        >
          search
        </Search>
      </header>
      <main>
        <Content {...data} />
      </main>
    </div>
  );
}

type SearchProps = {
  value: string;
  onKeyPress: KeyboardEventHandler;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Search: FC<SearchProps> = ({ value, onKeyPress, onChange, children }) => {
  return (
    <input
      type="search"
      className="search"
      value={value}
      onKeyPress={onKeyPress}
      onChange={onChange}
      maxLength={1}
      autoFocus={true}
      placeholder={children as string}
    />
  );
};

const Content: FC<DataType> = (data) => {
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
};

export default App;
