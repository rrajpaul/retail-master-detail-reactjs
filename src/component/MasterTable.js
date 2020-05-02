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
      offset: 0
    };
  }

  componentDidMount() {
    this.getMasterData();     
  }

  getMasterData = async () => {
    try {
      const url = config.dataUrl;
      let response = await axios.get(url);

      const count = response.data.length;
      const slice = response.data.slice(this.state.offset, this.state.offset + pager.pageLimit);
      let headerNames = Object.keys(slice[0]);
      this.setState({
        pageCount: Math.ceil(count / pager.pageLimit), 
        data: slice,
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
        offset={this.state.offset}
        callbackData={this.pagerDataCallback}
      />)
    )
  }

  masterDataCallback = (data) => {
    this.setState({ data });
  };

  pagerDataCallback = (offset) => {
    this.setState({ offset });
    this.getMasterData();
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