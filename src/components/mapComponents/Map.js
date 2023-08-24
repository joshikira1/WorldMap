import React, { useState,useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import Spinner from '../common/Spinner'
import CreateContext from '../../context/CreateContext';

export default function Map() {
    const {countryData, setCountryData,getCountryData} = useContext(CreateContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    debugger
    try {
      const response = await getCountryData();
      const countries = response
      setIsLoading(false);
      const selectedCountryData = countries.find((country) =>
        country.name.common.toLowerCase().includes(searchInput.toLowerCase())
      );

      setSelectedCountry(selectedCountryData);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

 
const countryPopup = selectedCountry && (
    <Popup position={selectedCountry.latlng}>
      <div>
        <h3>{selectedCountry.name.common}</h3>
        <img src={selectedCountry.flags.png} alt={`${selectedCountry.name.common} Flag`} style={{ maxWidth: '100px' }} />
        <p>Population: {selectedCountry.population}</p>
        <p>Area: {selectedCountry.area} km²</p>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Region: {selectedCountry.region}</p>
        <p>Timezones: {selectedCountry.timezones.join(', ')}</p>
        <p>Languages: {Object.values(selectedCountry.languages).join(', ')}</p>
        <p>Currencies: {Object.keys(selectedCountry.currencies).join(', ')}</p>
        {/* Add more country details here */}
      </div>
    </Popup>
  );
  
  return (
    <>
    {isLoading?<Spinner/>:""}
    <div className="container my-5">
      <div className='md-2'>
        <input
          type='search'
          placeholder='Search any country'
          className='form-input'
          style={{ width: '80%', height: '5vh', borderRadius: '10px', border: 'solid black 3px' }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className='btn btn-outline-info mx-2 fs-4' onClick={handleSearch}>Search</button>
      </div>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ width: '100%', height: '500px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {countryPopup}
      </MapContainer>
    </div></>
  );
}
