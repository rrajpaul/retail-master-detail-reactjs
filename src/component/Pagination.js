import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PropTypes from 'prop-types';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  };
  
  onPageChanged = e => {
    let page = parseInt(e.target.innerText, 10);

    this.setState({ currentPage: page }, () => {
      this.props.pageCallBack(page);
    });
  }

  onPageMoveLeft = e => {
    e.preventDefault();

    if(this.state.currentPage > 1) {
      let page = this.state.currentPage - 1; 
      this.setState({ currentPage: page });     
      this.props.pageCallBack(page);
      
      let el = document.getElementById("btn_"+ page);
      el.focus();
    }
    if(this.state.currentPage === 1) {
      let el = document.getElementById("btn_"+ 1);
      el.focus();
    }
  };

  onPageMoveRight = e => {
    e.preventDefault();

    if(this.state.currentPage < (this.props.pageCount)) {
      let page = this.state.currentPage + 1;
      this.setState({currentPage: page});
      this.props.pageCallBack(page);

      let el = document.getElementById("btn_"+ page);
      el.focus();
    }
    if(this.state.currentPage === (this.props.pageCount)) {
      let el = document.getElementById("btn_" + (this.props.pageCount));
      el.focus();
    }
  };

  setButtonType = (option) => {
    let styleClass = "pager pager-" + option;
    if(this.props.pagerButtonType === "circle") {
      styleClass = "pager-circle";
      if(option === "move") {
        styleClass = styleClass+ "-" + option;
      }      
    } else {
      if(option === "move") {
        styleClass = "pager-square-" + option;
      } 
    }
    return styleClass;
  }

  createPageLinks = () => {
    let pages = []
    let totalPages = this.props.pageCount;
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages.map((item, index) => {
      return (
        <button 
          id={"btn_" + item}
          key={item} 
          className={this.setButtonType("button")} 
          onClick={this.onPageChanged}          
        >
          {item}
        </button>         
      )
    })
  }

  render() {
    return (   
      <div className={"pager-container"}>  
        <button 
            id={"btn_left"}
            className={this.setButtonType("move")} 
            onClick={this.onPageMoveLeft}>          
            {
              this.props.pagerButtonType === "circle"
              ?<Icon size="large" className="angle left" fitted={true}></Icon>
              :"Previous"
            }
        </button>           
        {this.createPageLinks()}
        <button 
            id={"btn_right"}
            className={this.setButtonType("move")} 
            onClick={this.onPageMoveRight}>          
            {
              this.props.pagerButtonType === "circle"
              ?<Icon size="large" className="angle right" fitted={true}></Icon>
              :"Next"      
            }    
        </button>         
      </div>                                
    );
  }
}

Pagination.propTypes = {
  pageLimit: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pagerButtonType: PropTypes.string.isRequired,
  pageCallBack: PropTypes.func.isRequired,
}; 

export default Pagination;
