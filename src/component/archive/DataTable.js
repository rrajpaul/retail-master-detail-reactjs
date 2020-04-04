import React, {Component} from 'react';
import TableRow from './TableRow';

class DataTable extends Component {
  constructor(props) {
      super(props)
      this.state = {
        expanded: {},
        toggleIcon: '',
        isChildTable: this.props.isChildTable,
        masterKey: this.props.masterKey
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

  renderTableData = (headerNames, collapsedIcon, expandedIcon, tableData, showDetails,  
    allowAdd, allowEdit, allowDelete) => {
    return tableData.map((item, index) => {
      let dataValues = Object.values( item );
      return (
        <TableRow
          key={dataValues[0]}
          headerNames={headerNames}
          toggleIcon={this.state.expanded[dataValues[0]]? expandedIcon: collapsedIcon}
          showDetails={showDetails}
          isChildTable={this.state.isChildTable}
          allowAdd={allowAdd}
          allowEdit={allowEdit}
          allowDelete={allowDelete}
          expanded={this.state.expanded[dataValues[0]]}
          handleExpand={this.handleExpand}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          data={item}
          masterKey={this.state.masterKey}
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
    this.setState({ isChildTable: true });
    this.setState({ masterKey: parseInt(e.target.id) });
  }

  handleAdd = (e) => {
    alert('handleAdd');
  }

  handleEdit = (e) => {
    alert('handleEdit');
  }

  handleDelete = (e) => {
    alert('handleDelete');
  }
  
  async getDetailData(id) {
    if(id !== undefined && (id > -1) ) {
      const encodedValue = encodeURIComponent(id);
      const url = `http://localhost:9000/demo/api/styles/${encodedValue}/sku`;
  
      try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
      } catch (e) {
        console.log(`Axios request failed: ${e}`);
      }      
    } 
  }

  render() {
    let { collapsedIcon, expandedIcon, showDetails, isChildTable, allowAdd, allowEdit, allowDelete,
            headerNames, data } = this.props;

/*     console.log("data: ");
    console.log(data);
    console.log("headerNames");
    console.log(headerNames);
    console.log("masterKey");
    console.log(this.state.masterKey); */
    
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
              this.state.isChildTable, allowAdd, allowEdit, allowDelete)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default DataTable;
