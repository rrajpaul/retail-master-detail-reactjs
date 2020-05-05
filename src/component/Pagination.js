import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import PropTypes from 'prop-types';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      previousPage: 1
    };    
  };

  componentDidUpdate = () => {
    let el = document.getElementById("btn_" + this.state.currentPage);
    if( (el !== null) ) {
     el.className="pager-circle-select";
    } 
  }

  getButtonFocus = (page) => {
    let el = document.getElementById("btn_" + page);
    if(el !== null) {
      el.focus();      
    }    
  }

  onPageChanged = option => e => {
    e.preventDefault();
    let page = parseInt(e.target.innerText, 10);

    let el = document.getElementById("btn_"+ this.state.previousPage);
    if(el !== null) {
      el.className="pager-circle";
    }

    this.setState({ previousPage: page } )

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
      this.getButtonFocus(page);

      let elprev = document.getElementById("btn_"+ this.state.previousPage);
      if(elprev !== null) {
        elprev.className="pager-circle";
      }
      this.setState({previousPage: page});
    }

    if(this.state.currentPage === 1) {
      this.getButtonFocus(1);
    }
  };

  onPageMoveRight = e => {
    e.preventDefault();

    if(this.state.currentPage < (this.props.pageCount)) {
      let page = this.state.currentPage + 1;
      this.setState({currentPage: page});
      this.props.pageCallBack(page);
      this.getButtonFocus(page);

      let elprev = document.getElementById("btn_"+ this.state.previousPage);
      if(elprev !== null) {
        elprev.className="pager-circle";
      }
      this.setState({previousPage: page});
    }

    if(this.state.currentPage === (this.props.pageCount)) {
      this.getButtonFocus(this.props.pageCount);
    }
  };

  setButtonStyle = (option) => {
    let styleClass = "pager pager-" + option;
    if(this.props.pagerButtonType === "circle") {
      styleClass = "pager-circle";
      if( (option === "move") || (option === "select") ) {
        styleClass = styleClass+ "-" + option;
      }       
    } else {
      styleClass = "pager-square";
      if( (option === "move") || (option === "select") ) {
        styleClass = styleClass+ "-" + option;
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

    const option = "button";
    return pages.map((item, index) => {
      return (
        <button 
          id={"btn_" + item}
          key={item} 
          className={this.setButtonStyle(option)} 
          onClick={this.onPageChanged(option)}
        >
          {item}
        </button>         
      )
    })
  }

  render() {
    const option = "move";
    return (   
      <div className={"pager-container"}>  
        <button 
            id={"btn_left"}
            className={this.setButtonStyle(option)} 
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
            className={this.setButtonStyle(option)} 
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
