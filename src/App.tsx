import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import "./App.css";

interface ICountry {
  country: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CountryContext = createContext<ICountry | null>(null);

function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  return (
    <CountryContext.Provider value={{ country, handleChange }}>
      {children}
    </CountryContext.Provider>
  );
}

export default function App() {
  return (
    <div className="App">
      <CountryProvider>
        <CountryPicker />
        <CountryDetails />
      </CountryProvider>
    </div>
  );
}

function CountryDetails() {
  const { country } = useCountryContext();
  return <h1>{country}</h1>;
}

function CountryPicker() {
  const { country, handleChange } = useCountryContext();

  return (
    <select value={country} onChange={handleChange}>
      <option value="">Select a country</option>
      <option value="BR">Brazil</option>
      <option value="CA">Canada</option>
      <option value="US">USA</option>
    </select>
  );
}

const useCountryContext = () => useContext(CountryContext)!;
