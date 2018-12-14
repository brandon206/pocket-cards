
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/sets.css'
import { connect } from 'react-redux';
import { getSetsData } from '../actions';

class Sets extends Component{
    componentDidMount(){
        this.props.getSetsData(this.props.match.params.set_id);
    }

    render(){
        const { category } = this.props;
        const userSubCategories = this.props.topics.map ((item, index) => {
            
            return(

                <div key= {item.setID} className="row set">
                    <Link to={`/displayCard/${item.setID}/topic/${item.topicID}/card/0`} className ="btn blue darken-3 ">{item.subCategory}</Link>
                </div>
            );  
        });

        return(
            <div className="center set-container">
                <h3 className="white-text">{category}</h3>
                <div className="col s12">
                    {userSubCategories}
                </div>
                <div className="row">
                    <div className="col s12 center">
                        <Link to="/profile" className="btn yellow darken-2 wide-btn">Home</Link>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log("this is the state", state)
    return{
        category: state.sets.category,
        topics: state.sets.topics
        
    }
}

export default connect(mapStateToProps, {
    getSetsData
})(Sets);

