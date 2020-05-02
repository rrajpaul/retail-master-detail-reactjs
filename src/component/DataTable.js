import React from "react";
import TableRow from "./TableRow";
import DataHeader from "./DataHeader";
import axios from "axios";
import configInfo from "../config.json"; 

const configMaster = configInfo.masterConfig;
const configDetail = configInfo.detailConfig;

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: {},
      toggleIcon: "",
      masterKey: this.props.masterKey,
      editCurrentRow: { edit: false, id: -1 },
      editData: [],
    };
  }

  handleExpand = (e) => {
    const expanded = this.state.expanded;
    const { expandedIcon, collapsedIcon } = this.props;
    let toggleIcon = "";
    expanded[e.target.id] = !expanded[e.target.id];
    this.setState({ expanded });
    expanded[e.target.id]
      ? (toggleIcon = expandedIcon)
      : (toggleIcon = collapsedIcon);
    this.setState({ toggleIcon });
    this.setState({ masterKey: parseInt(e.target.id) });
  };

  handleAdd = (e) => {
    alert("handleAdd needs to be implemented");
  };

  handleEdit = (e) => {
    let idValue = parseInt(e.target.id.substring(0, e.target.id.indexOf("_")));
    this.setState({ editCurrentRow: { edit: true, id: idValue } });    
  };

  handleEditUpdate = (e) => {
    let idValue = parseInt(e.target.id);
    if(e.target.id.indexOf("_") > -1) {
      idValue = parseInt(e.target.id.substring(0, e.target.id.indexOf("_")));
    }
    let data = this.props.data;
    let result = data.filter(function (obj) {
      return obj.StyleId === idValue;
    });

    this.updateMasterData(idValue, result).then(() => {      
    });
    this.props.callbackData(this.state.editData);
    this.setState({ editCurrentRow: { edit: false, id: idValue } });    
  };

  handleEditChange = (e) => {
    let id = parseInt(e.target.id.substring(e.target.id.indexOf("_") + 1));
    let fieldName =e.target.id.substring(0, e.target.id.indexOf("_"));
    let data = this.props.data;

    const index = data.map(e => e.StyleId).indexOf(id);
    var result = data[index];
    result[fieldName] = e.target.value;
    data[index] = result;
    this.setState({editData: data});
  };

  handleEditCancel = (e) => {
    let idValue = parseInt(e.target.id.substring(0, e.target.id.indexOf("_")));
    this.setState({ editCurrentRow: { edit: false, id: idValue } });    
  };

  handleDelete = (e) => {
    let id = e.target.id.substring(0, e.target.id.indexOf("_"));
    this.deleteMasterData(id).then(() => {
      let modifiedData = this.props.data.filter(function (obj) {
        return obj.StyleId !== parseInt(id);
      });

      this.props.callbackData(modifiedData);
    });
    this.deleteDetailData(id).then(() => {});
  };

  updateMasterData = async (id, data) => {
    try {
      const encodedId = encodeURIComponent(id);
      const url = configMaster.updateUrl.replace('{StyleId}', encodedId);
      let response = await axios.put(url, data[0]);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  };

  deleteMasterData = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      const url = configMaster.deleteUrl.replace('{StyleId}', encodedId);
      let response = await axios.delete(url);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  };

  deleteDetailData = async (id) => {
    try {
      const encodedId = encodeURIComponent(id);
      const url = configDetail.deleteUrl.replace('{StyleId}', encodedId);
      let response = await axios.delete(url);
      return response.status;
    } catch (err) {
      console.log(err);
    }
  };

  renderTableData = (
    headerNames,
    collapsedIcon,
    expandedIcon,
    tableData,
    showDetails,
    isChildTable,
    allowAdd,
    allowEdit,
    allowDelete
  ) => {
    return tableData.map((item) => {
      let id = Object.values(item)[0];
      return (
        <TableRow
          key={
            isChildTable
              ? "_detail_row-" + item[configDetail.keyFieldName]
              : "_master_row-" + id
          }
          headerNames={headerNames}
          toggleIcon={this.state.expanded[id] && !this.state.editCurrentRow.edit ? expandedIcon : collapsedIcon}
          showDetails={showDetails}
          isChildTable={isChildTable}
          allowAdd={allowAdd}
          allowEdit={allowEdit}
          allowDelete={allowDelete}
          expanded={this.state.expanded[id]}
          handleExpand={this.handleExpand}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleEditUpdate={this.handleEditUpdate}
          handleEditCancel={this.handleEditCancel}
          handleEditChange={this.handleEditChange}
          handleDelete={this.handleDelete}
          data={item}
          masterKey={this.state.masterKey}
          detailKey={item[configDetail.keyFieldName]}
          editCurrentRow={this.state.editCurrentRow}
        />
      );
    });
  };

  render() {
    const {
      collapsedIcon,
      expandedIcon,
      showDetails,
      isChildTable,
      headerNames,
      data,
    } = this.props;
    const localAdd = this.props.allowAdd;
    const localEdit = this.props.allowEdit;
    const localDelete = this.props.allowDelete;
    const localDetailKey = this.props.detailKey;

    return (
      <div>
        <table className={
              isChildTable ? 
                this.state.editCurrentRow.edit ? "detail no-padding" : "detail"
              : this.state.editCurrentRow.edit ? "master no-padding" : "master"               
            }            
        >
          <tbody>
            <tr>
              <DataHeader headerNames={headerNames} />
            </tr>
            {this.renderTableData(
              headerNames,
              collapsedIcon,
              expandedIcon,
              data,
              showDetails,
              isChildTable,
              localAdd,
              localEdit,
              localDelete,
              localDetailKey
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
