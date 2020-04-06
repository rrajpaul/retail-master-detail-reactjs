import React from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import MasterTable from './component/MasterTable';


  ReactDOM.render(
    <>
      <h1 className="grid-title">Retail Style/Sku Example</h1>
      <div className="grid-container">
        <MasterTable key={"style_sku_master_detail_0"}/>
      </div>
    </>,  document.getElementById('root')
  );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
