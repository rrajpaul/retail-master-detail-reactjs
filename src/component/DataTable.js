import React, {Component} from 'react';
import TableRow from './TableRow';

class DataTable extends Component {
  constructor(props) {
      super(props)
      this.state = {
        expanded: {},
        toggleIcon: '',
        masterKey: this.props.masterKey,
        editCurrentRow: -1
      };
  }

  renderTableHeader = (headerNames) => {
    return headerNames.map((key, index) => {
        let headerVal = null;
        if((index >= 1) ) {
          headerVal =  <th key={index}>{key.toUpperCase()}</th>
        }
        if(index === 0 ) {
            headerVal =  <th key={index} style={{textAlign:"center", width: "40px"}}></th>
        }
        return headerVal
    });
  }

  renderTableData = (headerNames, collapsedIcon, expandedIcon, tableData, showDetails, isChildTable, 
    allowAdd, allowEdit, allowDelete) => {
    return tableData.map((item) => {
      let id = Object.values( item )[0];
      return (
        <TableRow
          key={id}
          headerNames={headerNames}
          toggleIcon={this.state.expanded[id]? expandedIcon: collapsedIcon}
          showDetails={showDetails}
          isChildTable={isChildTable}
          allowAdd={allowAdd}
          allowEdit={allowEdit}
          allowDelete={allowDelete}
          expanded={this.state.expanded[id]}
          handleExpand={this.handleExpand}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          data={item}
          masterKey={this.state.masterKey}
          editCurrentRow={this.state.editCurrentRow}
         />
      )
    })
  }

  handleExpand = (e) => {
    const expanded = this.state.expanded;
    const { expandedIcon, collapsedIcon } = this.props;    
    let toggleIcon = '';
    expanded[e.target.id] = !expanded[e.target.id];
    this.setState({ expanded });
    expanded[e.target.id]? (toggleIcon = expandedIcon):  (toggleIcon = collapsedIcon);
    this.setState({ toggleIcon });
    this.setState({ masterKey: parseInt(e.target.id) });
  }

  handleAdd = (e) => {
    alert('handleAdd needs to be implemented');
  }

  handleEdit = (e) => {
    //alert('handleEdit needs to be implemented');
    let editCurrentRow = this.state.masterKey;
    this.setState({ editCurrentRow });
  }

  handleDelete = (e) => {
    alert('handleDelete needs to be implemented');
  }

  render() {
    const { collapsedIcon, expandedIcon, showDetails, isChildTable, headerNames, data } = this.props;
    const localAdd = this.props.allowAdd;
    const localEdit = this.props.allowEdit;
    const localDelete = this.props.allowDelete;
    return (
      <div>
        <table className={isChildTable? "detail" : "master"}>
          <tbody>
            <tr>
              {
                this.renderTableHeader(headerNames)
              }
            </tr>
            {
              this.renderTableData(headerNames, collapsedIcon, expandedIcon, data, showDetails, 
                isChildTable, localAdd, localEdit, localDelete)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default DataTable;
