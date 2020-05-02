import React from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import MasterTable from './component/MasterTable';


  ReactDOM.render(
    <>
      <h1 className="grid-title">Retail Style/Sku Example</h1>
      <div className="grid-container">
        <MasterTable 
          key={"_master_table"} 
        />
      </div>
    </>,  document.getElementById('root')
  );

