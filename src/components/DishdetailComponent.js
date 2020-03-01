import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

const RenderDish = ({dish})=>{
    return dish ? (
            <Card width="100%">
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
        :
        null;
};

const RenderComments = ({comments})=>{
    return comments!= null ? (
            <>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map(comment=>(
                        <div key={comment.id}>
                            <li className="mt-2">{comment.comment}</li>
                            <li className="mt-2">-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                        </div>
                    ))
                    }
                </ul>
            </>
        )
        :
        (<div> </div>)
};

const DishDetail = (props) => {
    const dish = props.dish;
    const comments = props.comments;
    console.log(comments)
        return dish!= null? (
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
                        <RenderDish dish={dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={comments} />
                    </div>
                </div>
            </div>
        )
        :
        <div></div>
};

export default DishDetail;
