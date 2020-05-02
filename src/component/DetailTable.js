import React from "react";
import DataTable from "./DataTable";
import axios from "axios";
import configInfo from "../config.json"; 

const config = configInfo.detailConfig;

class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headerNames: [],
      masterKey: this.props.masterKey,
    };
  }

  componentDidMount() {
    this.getDetailData();
  }

  getDetailData = async () => {
    try {
      const encodedId = encodeURIComponent(this.state.masterKey);
      const url = config.dataUrl.replace('{StyleId}', encodedId);
      let response = await axios.get(url);
      let data = response.data;
      this.setState({ data: data });
      let headerNames = Object.keys(data[0]);
      this.setState({ headerNames: headerNames.slice(1) });
    } catch (err) {
      console.log(err);
    }
  };

  detailDataCallback = (modifiedData) => {
    this.setState({ data: modifiedData });
  };

  render() {
    const masterKey = this.props.masterKey;
    let dataValues = Object.values(this.state.data);
    let detail_id = dataValues[1];
    return (
      <DataTable
        key={"_detail_dt-" + masterKey}
        collapsedIcon={""}
        expandedIcon={""}
        showDetails={config.showDetails}
        isChildTable={true}
        allowAdd={config.allowAdd}
        allowEdit={config.allowEdit}
        allowDelete={config.allowDelete}
        headerNames={this.state.headerNames}
        handleExpand={this.handleExpand}
        handleAdd={this.handleAdd}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        data={this.state.data}
        masterKey={masterKey}
        detailKey={detail_id}
        callbackData={this.detailDataCallback}
      />
    );
  }
}

export default DetailTable;
