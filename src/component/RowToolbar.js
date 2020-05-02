import React from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import configInfo from "../config.json"; 

const configMaster = configInfo.masterConfig;
const configDetail = configInfo.detailConfig;

function RowToolbar(props) {
  const expanded = false;
  const addIcon = props.isChildTable? configDetail.addIcon: configMaster.addIcon;
  const editIcon = props.isChildTable? configDetail.editIcon: configMaster.editIcon;
  const deleteIcon = props.isChildTable? configDetail.deleteIcon: configMaster.deleteIcon;
  return (
    <table className={"toolbar"}>
      <tbody>
        <tr>
          {props.showDetails && (
            <td>
              <Icon
                id={props.id}
                link
                className={props.toggleIcon}
                title={
                  !expanded
                    ? "Click to expand details"
                    : "Click to hide details"
                }
                onClick={props.handleExpand}
              />
            </td>
          )}
          {props.allowAdd && (
            <td>
              <Icon
                id={props.id + "_add"}
                title={"Add a new row"}
                link
                className={addIcon}
                onClick={props.handleAdd}
              />
            </td>
          )}
          {props.allowEdit && (
            <td>
              <Icon
                id={props.id + "_edit"}
                title={"Edit current row"}
                link
                className={editIcon}
                onClick={props.handleEdit}
              />
            </td>
          )}
          {props.allowDelete && (
            <td>
              <Icon
                id={props.id + "_delete"}
                title={"Delete current row"}
                link
                className={deleteIcon}
                onClick={props.handleDelete}
              />
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
}

export default RowToolbar;
