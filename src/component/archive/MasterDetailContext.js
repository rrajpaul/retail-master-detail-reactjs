import React, {Component} from 'react';

export const MasterDetailContext = React.createContext();
class MasterDetialProvider extends Component {
    state = {
        collapsedIcon: "",
        expandedIcon: "",
        showDetails: false,
        isChildTable: false,
        allowAdd: false,
        allowEdit: false,
        allowDelete: false,
        headerNames: [],
        dataColumns: [],
        masterData: [],
        detailData: []
    } 
    render() {        
        return (            
        <MasterDetailContext.Provider value = {
            {
                state: this.state,  
                setCollapsedIcon: (value) => this.setState({collapsedIcon: value }),
                setExpandedIcon: (value) => this.setState({expandedIcon: value }),
                setShowDetails: (value) => this.setState({showDetails: value }),
                setIsChildTable: (value) => this.setState({isChildTable: value }),
                setAllowAdd: (value) => this.setState({allowAdd: value }),
                setAllowEdit: (value) => this.setState({allowEdit: value }),
                setAllowDelete: (value) => this.setState({allowDelete: value }),
                setHeaderNames: (value) => this.setState({headerNames: value }),
                setDataColumns: (value) => this.setState({dataColumns: value }),
                setmasterData: (value) => this.setState({masterData: value }),
                setDetailData: (value) => this.setState({detailData: value })
            }
        }>
            {this.props.children}   
        </MasterDetailContext.Provider>)
    }
}