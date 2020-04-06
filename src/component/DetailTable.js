import React, {Component} from 'react';
import DataTable from './DataTable';
import axios from 'axios'

class DetailTable extends Component {
  constructor(props) {
      super(props)
      this.state = {
        showDetails: true,
        data: [],
        headerNames: [],
        masterKey: this.props.masterKey
      }
  }

  componentDidMount() {
    this.getDetailData();
  }
  
  getDetailData = async() => {
    try {
      const encodedValue = encodeURIComponent(this.state.masterKey);
      const url = `http://localhost:9000/demo/api/styles/${encodedValue}/sku`;
      let response = await axios.get(url);
      let data = response.data;
      this.setState({ data: data });
      let headerNames = Object.keys(data[0]);     
      this.setState({ headerNames:  headerNames.slice(1) });
    } catch (err) {
      console.log(err);
    }
  }

  render(){
    const masterKey = this.props.masterKey;
    const localAdd = true;
    const localEdit = true;
    const localDelete = true;
    return(
      <DataTable key={"style_detail_" + this.state.masterKey}
        collapsedIcon={''}
        expandedIcon={''}
        showDetails={false}
        isChildTable={true}
        allowAdd={localAdd}
        allowEdit={localEdit}
        allowDelete={localDelete}
        headerNames={this.state.headerNames}
        handleExpand={this.handleExpand}
        handleAdd={this.handleAdd}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        data={this.state.data}
        masterKey={masterKey}
      />
    )
  }
}

export default DetailTable;