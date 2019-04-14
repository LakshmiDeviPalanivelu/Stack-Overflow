import React, { Component } from 'react';
import {  Button, Checkbox, Form, Segment, Container, Header, Label, Input, Table} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { transactionList } from '../../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class StatsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
     list: []
    }
  }
  
  componentWillMount() {
     this.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
       if (nextProps.list.transactions) {
        this.setList(nextProps);
      }
    }
  }

  getList = () => {
    this.props.transactionList();
  }

  setList = props => {
    if (props && props.list.transactions) {
      this.setState(() => ({
        list: props.list.transactions
      }));
    }
  }

render() {
 return (
 <section id="Login" className="container center"> 
  <Segment>
    <Container>
    <Link to="/">
      <Button positive floated='right'>Logout</Button>
    </Link>
    <br />
    <br />
      <Table celled>    
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Question</Table.HeaderCell>
            <Table.HeaderCell>Answer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        { 
         _.map(this.props.list.transactions, ({ name, question, answer }, index) => (
          <Table.Row key={index}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{question}</Table.Cell>
            <Table.Cell>{answer}</Table.Cell>
          </Table.Row>
         ))
        }  
        </Table.Body>
      </Table>    
    
    </Container>
  </Segment>
 </section>
 )
}

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ transactionList }, dispatch)
};

const mapStateToProps = (state) => ({
  list: state.transaction_reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
