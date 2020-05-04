import React from "react";
import axios from "axios";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import configInfo from "../config.json";

const config = configInfo.masterConfig;
const pager = configInfo.pager;

class MasterTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headerNames: [],
      pageCount: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.getMasterData(1);     
  }

  getMasterData = async (page) => {
    try {
      const encodedPageNumber = encodeURIComponent(page);
      const encodedPerPage = encodeURIComponent(pager.pageLimit);
      const url = config.dataUrl.replace('{PageNumber}', encodedPageNumber).replace('{PerPage}', encodedPerPage);
      let response = await axios.get(url);
;
      let resCount = await axios.get(config.countUrl);

      const count = resCount.data;
      let headerNames = Object.keys(response.data[0]);
      this.setState({
        pageCount: Math.ceil(count / pager.pageLimit), 
        data: response.data,
        headerNames
      })
    } catch (err) {
      console.log(err);
    }
  };

  getPager = (position) => {
    return (
    (pager.pagerPosition === position) &&
    (<Pagination 
        key={"_master_pager_" + position}
        pageLimit={pager.pageLimit}   
        pageCount={this.state.pageCount}
        pagerButtonType={pager.pagerButtonType}    
        pageCallBack={this.pagerDataCallback}
      />)
    )
  }

  masterDataCallback = (data) => {
    this.setState({ data });
  };

  pagerDataCallback = (currentPage) => {
    this.getMasterData(currentPage);
  };

  render() {
    return (
      <>
        {
          this.getPager("top")
        }
        <DataTable
          key={"_master_dt"}
          collapsedIcon={config.collapsedIcon}
          expandedIcon={config.expandedIcon}
          showDetails={config.showDetails}
          isChildTable={false}
          allowAdd={config.allowAdd}
          allowEdit={config.allowEdit}
          allowDelete={config.allowDelete}
          headerNames={this.state.headerNames}
          handleExpand={this.handleExpand}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          data={this.state.data}
          callbackData={this.masterDataCallback}
        />
        {        
          this.getPager("bottom")
        }
      </>
    );
  }
}

export default MasterTable;