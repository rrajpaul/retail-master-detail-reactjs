import React, {Component} from 'react';
import DataTable from './DataTable';
import axios from 'axios'

let collapsedIcon = 'large caret right';
let expandedIcon = 'large caret down';

class MasterTable extends Component {
  constructor(props) {
      super(props)
      this.state = {
        showDetails: true,
        data: [],
        headerNames: [],
      }
  }

  componentDidMount() {
    this.getMasterData();
  }
  
  getMasterData = async() => {
    try {
      const url = 'http://localhost:9000/demo/api/styles';
      let response = await axios.get(url);
      let data = response.data;
      this.setState({ data: data });
      let headerNames = Object.keys(data[0]);
      this.setState({ headerNames: headerNames });
    } catch (err) {
      console.log(err);
    }
  }

  render(){
    const localAdd = true;
    const localEdit = false;
    const localDelete = false;
    return(
      <DataTable key={"style_master_0"}
        collapsedIcon={collapsedIcon}
        expandedIcon={expandedIcon}
        showDetails={this.state.showDetails}
        isChildTable={false}
        allowAdd={localAdd}
        allowEdit={localEdit}
        allowDelete={localDelete}
        headerNames={this.state.headerNames}
        data={this.state.data}
      />
    )
  }
}

export default MasterTable;