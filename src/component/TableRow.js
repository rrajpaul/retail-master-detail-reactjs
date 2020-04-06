import React from 'react';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import DetailTable from './DetailTable';

class TableRow extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        expanded: false,
        addIcon: 'plus',
        editIcon: 'edit',
        deleteIcon: 'close'
      };
  }

  renderRowData = (data, editCurrentRow, id) => {
    return data.map((item, index) => {
      return (
        <td key={index + 'data'} className={typeof item == 'number'? "cell-number": "cell-text"}>
          {            
            item
          }
        </td>
      )
    })
  }

  render() {
    const { toggleIcon, showDetails, isChildTable, allowAdd, allowEdit, allowDelete, expanded, 
      handleExpand, handleAdd, handleEdit, handleDelete, data, editCurrentRow} = this.props;
    
    let dataValues = Object.values( data );
    let dataOnly = showDetails? dataValues.slice(1): (isChildTable? dataValues.slice(2): dataValues.slice(1));
    let id = dataValues[0];

    return (
      <>
        <tr key={id}>
          <td>
            <table  className={"toolbar"}>
              <tbody>
                <tr>
                  {showDetails &&
                    <td><Icon id={id} link className={toggleIcon} title={!expanded? "Click to expand details": "Click to hide details"} onClick={handleExpand}/></td>
                  }
                  {allowAdd &&
                    <td><Icon id={id + '_add'} title={"Add a new row"} link className={this.state.addIcon} onClick={handleAdd}/></td>
                  }
                  {allowEdit &&
                    <td><Icon id={id + '_edit'} title={"Edit current row"} link className={this.state.editIcon} onClick={handleEdit}/></td>
                  }
                  {allowDelete &&
                    <td><Icon id={id + '_delete'} title={"Delete current row"} link className={this.state.deleteIcon} onClick={handleDelete}/></td>
                  }
                  </tr>
                </tbody>
              </table>
          </td>
          {this.renderRowData(dataOnly, editCurrentRow, id)}
         </tr>
         {
           expanded &&
           <tr key={id + '_detail'} >
             <td ></td>
             <td colSpan={dataValues.length - 1}>
               <DetailTable
                 masterKey={id}
               />
              </td>
          </tr>
        }
        </>
    )
  }
}

export default TableRow;
