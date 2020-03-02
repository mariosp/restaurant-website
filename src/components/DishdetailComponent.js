import React, {Component} from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader, ModalBody, Row, Label, Col
} from "reactstrap";
import {Link} from "react-router-dom";
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components"

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state ={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <>
                <Button outline color="secondary" onClick={this.toggleModal}><i className="fa fa-pencil"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=> this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control" defaultValue={1}>
                                        <option value={1}>1</option>
                                        <option  value={2}>2</option>
                                        <option  value={3}>3</option>
                                        <option  value={4}>4</option>
                                        <option  value={5}>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      minLength:minLength(3), maxLength: maxLength(15)
                                                  }}
                                    />
                                    <Errors model=".author" show="touched" className="text-danger" messages={{
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      rows="6"
                                                      className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" value="Submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

const RenderDish = ({dish})=>{
    return dish ? (
        <FadeTransform in
                       transformProps={{
                           exitTransform: 'scale(0.5) translateY(-50%)'
                       }}>
            <Card width="100%">
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
        )
        :
        null;
};

const RenderComments = ({comments, postComment, dishId})=>{
    return comments!= null ? (
            <>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map(comment=>(
                            <Fade in>
                                <div key={comment.id}>
                                    <li className="mt-2">{comment.comment}</li>
                                    <li className="mt-2">-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                                </div>
                            </Fade>
                        ))
                        }
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </>
        )
        :
        (<div> </div>)
};

const DishDetail = (props) => {
    if(props.isLoading){
        return (
           <div className="container" >
               <div className="row">
                   <Loading/>
               </div>
           </div>
        );
    }else if(props.errMess){

        return (
            <div className="container" >
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }else if(props.dish!= null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                                        postComment={props.postComment}
                                        dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        )
    }else{
        return <div></div>
    }
};

export default DishDetail;
