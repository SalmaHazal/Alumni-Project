import React from 'react';
import { GlobalStyles } from '@mui/system';

const GlobalStyle = () => (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: "'Lato', sans-serif",
        color: 'white',
      },
      '*::-webkit-scrollbar': {
        width: '5px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: 'transparent',
      },
      '.active-button': {
        borderStyle: 'none !important',
        backgroundColor: '#f54b00 !important',
      },
      '.active-box': {
        backgroundColor: '#0F1B41',
      },
    }}
  />
);

export default GlobalStyle;
