import React, {Component} from 'react';
import DataTable from '../DataTable';

let collapsedIcon = 'caret right';
let expandedIcon = 'caret down';

class MasterDetailTable extends Component {
  constructor(props) {
      super(props)
      this.state = {
        showDetails: true
      }
  }

  render() {
    const data = this.props.data;
    const headerNames = Object.keys(data[0]);
    return (
        <DataTable key={"style_master_0"}
          collapsedIcon={collapsedIcon}
          expandedIcon={expandedIcon}
          showDetails={this.state.showDetails}
          isChildTable={false}
          allowAdd={true}
          allowEdit={true}
          allowDelete={true}
          headerNames={headerNames}
          data={data}
          masterKey={ 0 }
        />
    )
  }
}

export default MasterDetailTable;
