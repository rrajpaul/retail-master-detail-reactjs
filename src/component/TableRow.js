import React from "react";
import DetailTable from "./DetailTable";
import RowToolbar from "./RowToolbar";
import {  Button, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  renderRowData = (data, id, isChildTable, allowEdit, allowAdd, headers) => {
    return data.map((item, index) => {
      return (
        allowEdit && this.props.editCurrentRow.edit && (this.props.editCurrentRow.id === id) ?
            <Grid.Row key={"row_entry_" + headers[index + 1] + "_" + id} style={{verticalAlign: "center"}}>
              <Grid.Column width={2} style={{paddingTop: "8px"}}>
                {headers[index + 1]}
              </Grid.Column>  
              <Grid.Column 
                key={
                  isChildTable
                    ? "_detail_cell_" + index + "-" + id
                    : "_master_cell_" + index + "-" + id
                }
                width={14}    
              >
                <input
                  id={headers[index + 1] + "_" + id}
                  className={
                    (typeof item == "number" ? "cell-number" : "cell-text") +
                    " edit-entry"
                  }
                  defaultValue={item}
                  onChange={this.props.handleEditChange}
                />
              </Grid.Column>
            </Grid.Row>
          :
          <td 
            key={
              isChildTable
              ? "_detail_cell_" + index + "-" + id
              : "_master_cell_" + index + "-" + id
            }
            className={typeof item == "number" ? "cell-number" : "cell-text"}
            >          
          {item}
          </td>
      );
    });
  };

  render() {
    const {
      toggleIcon,
      showDetails,
      isChildTable,
      allowAdd,
      allowEdit,
      allowDelete,
      expanded,
      handleExpand,
      handleAdd,
      handleEdit,
      handleEditUpdate,
      handleEditCancel,
      handleDelete,
      data,
      detailKey,
    } = this.props;

    let headers = Object.keys(data);
    let dataValues = Object.values(data);
    let dataOnly = [];
    let id = dataValues[0];

    dataOnly = dataValues.slice(1);
    if (!showDetails && isChildTable) {
      dataOnly = dataValues.slice(2);
    }

    return (
      <>
        <tr>
          <td style={{verticalAlign: "top"}}>
            <RowToolbar
              key={
                "_toolbar-" + (!showDetails && isChildTable ? detailKey : id)
              }
              id={!showDetails && isChildTable ? detailKey : id}
              toggleIcon={toggleIcon}
              showDetails={showDetails}
              allowAdd={allowAdd}
              allowEdit={allowEdit}
              allowDelete={allowDelete}
              handleExpand={handleExpand}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </td>
          {allowEdit && this.props.editCurrentRow.edit && (this.props.editCurrentRow.id === id) ?
            <td colSpan={dataOnly.length} className="inline-edit">
              <Grid style={{marginTop: "10px", marginBottom: "10px"}}>
                  {
                    this.renderRowData(
                      dataOnly,
                      showDetails && isChildTable ? detailKey : id,
                      isChildTable,
                      allowEdit,
                      allowAdd,
                      headers
                    )
                  }
                  <Grid.Row>
                    <Grid.Column width={12}>      
                    </Grid.Column>      
                    <Grid.Column width={4}>
                      <Button id={"update_"+  showDetails && isChildTable ? detailKey : id} 
                        onClick={handleEditUpdate}>Update</Button>
                      <Button id={"cancel_"+  showDetails && isChildTable ? detailKey : id} 
                        onClick={handleEditCancel}>Cancel</Button>
                    </Grid.Column >
                  </Grid.Row>
              </Grid>
            </td>
          :
            this.renderRowData(
                dataOnly,
                showDetails && isChildTable ? detailKey : id,
                isChildTable,
                allowEdit,
                allowAdd,
                headers
              )   
            }                               
        </tr>        
        {expanded && !this.props.editCurrentRow.edit && (
          <tr>
            <td></td>
            <td colSpan={dataValues.length - 1}>
              <DetailTable key={"_detail-table-" + id} masterKey={id} />
            </td>
          </tr>
        )}
      </>
    );
  }
}

export default TableRow;
