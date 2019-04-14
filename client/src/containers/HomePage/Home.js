import React, { Component } from 'react';
import {  Button, Checkbox, Form, Segment, Container, Header, Label, Input} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendData } from '../../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const questions = {
  "1": "What is most important to you to maintain ?",
  "2": "You would like to be: ",
  "3": "What are you most irritated by ?",
  "4": "What best describes how you make decisions ?",
  "5": "How would others describe you? "
}

const answerOptions = {
  "1": ["Relationships", "Credibility", "Success"],
  "2": ["Liked", "Correct", "Admired"],
  "3": ["Insensitivity", "Unpredictability", "Boredom"],
  "4": ["Considered", "Deliberate", "Decisive"],
  "5": ["Pleasant", "Precise", "Stimulating"]
}

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
     disable: true,
     question: '',
     answer: '',
     data: '',
     answerOption: []
    }
  }
  
  componentWillMount() {
    const value = Math.floor(Math.random() * 5 + 1);
    let question = questions[value];
    let ans = answerOptions[value];
    this.setState({ 
      question,
      answerOption: ans
     })
  }
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  
  handleItemClick = () => {
    this.setState({ disable: false});
  }

  handleSubmit = () => {
     const name = this.state.name;
     const question = this.state.question;
     const answer = this.state.answer;
     const data = {
       name: name,
       question: question,
       answer: answer
     }
     this.props.sendData(data);
  }

render() {
 const { answer, answerOption } = this.state
 return (
 <section id="Login" className="container center"> 
  <Segment>
    <Container>
      <Button positive floated='right' onClick={this.handleItemClick}>Login</Button>
      <Form>
        <Form.Group inline>
          <Form.Field disabled={this.state.disable}>
            <label>Name:</label>
            <Input name='name' onChange={this.handleChange}/>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
            <Form.Field disabled={this.state.disable}>
              <label>Question:</label>
              <label>{this.state.question}</label>
            </Form.Field>
        </Form.Group>
        <Form.Group inline>
            <Form.Field disabled={this.state.disable}>
              <label>Your Answer:</label>
            </Form.Field>
            <Form.Radio label={answerOption[0]} name='answer' value={answerOption[0]} checked={answer === answerOption[0]} onChange={this.handleChange} disabled={this.state.disable}/>
            <Form.Radio label={answerOption[1]} name='answer' value={answerOption[1]} checked={answer === answerOption[1]} onChange={this.handleChange} disabled={this.state.disable}/>
            <Form.Radio label={answerOption[2]} name='answer' value={answerOption[2]} checked={answer === answerOption[2]} onChange={this.handleChange} disabled={this.state.disable}/>
        </Form.Group>
        <Link to="/stats">
          <Button type='submit' onClick={this.handleSubmit} disabled=  {this.state.disable}>Submit</Button>
        </Link>
      </Form>
    </Container>
  </Segment>
 </section>
 )
}

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({sendData}, dispatch)
};

const mapStateToProps = (state) => ({
  list: state.transaction_reducer
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
