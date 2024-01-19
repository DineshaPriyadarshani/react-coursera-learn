import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody, Col, Row, Button,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderComments({comments, postComment, dishId}) {
        if (comments != null) {
            const commentsList = comments.map((e) => {
                return (
                    <Fade in>
                        <div class="container">
                                <div className="m-1 text-left">
                                    {e.comment}
                                </div>
                                <div className="m-1 text-left">
                                    -- {e.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(e.date))) }
                                </div>
                        </div>
                    </Fade>
                    
                );
            });

            return (
                <div>
                    <div className="row">
                        {commentsList}
                    </div>
                    <div className="row">
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </div>
                </div>
                
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

function RenderDish({dish}) {
    return (
        <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)'}}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card> 
        </FadeTransform>
    )
}

const DishDetail = (props) => {
        if(props.isLoading) {
            return(
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess) {
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (props.dish != null)
            return (
                <div className="container">
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish[0].name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish[0]} />
                        </div>
                        <div className="col-12 col-md-5 m-1 pl-5 pr-5">
                            <div className="row"><h4>Comments</h4></div>
                            <div className="row">
                                <ul class="list-unstyled">
                                    <Stagger in>
                                        <RenderComments comments={props.comments}
                                        postComment={props.postComment}
                                        dishId={props.dish[0].id} />
                                    </Stagger>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>               
            );
        else
            return (
                <div></div>
            );
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.togglemodal = this.togglemodal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isModalOpen: false
        }
    }

    togglemodal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.togglemodal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    render() {
        return(
            <div>
                <div className="container">
                    <Row className="form-group">
                        <Col md={{size: 12}}>
                            <Button type="submit" outline color="secondary" onClick={this.togglemodal}><i className="fa fa-pencil fa-lg"></i>Submit Comment</Button>
                        </Col>
                    </Row>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.togglemodal}>
                    <ModalHeader toggle={this.togglemodal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label className="ml-3 mb-n2" htmlFor="rating">Rating</Label>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.select model=".rating"
                                    className='form-control' 
                                    id="rating" 
                                    name="rating" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="ml-3 mb-n2" htmlFor="name">Your Name</Label>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".name" 
                                    className='form-control'
                                    id="name" 
                                    name="name" 
                                    placeholder="Your Name"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }} />
                                    <Errors
                                    className='text-danger'
                                    model='.name'
                                    show='touched'
                                    messages={{
                                        minLength: 'Must be greater than 2 charactors',
                                        maxLength: 'Must be 15 charactors or less'
                                    }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="ml-3 mb-n2" htmlFor="comment">Comment</Label>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" className='form-control' />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default DishDetail;