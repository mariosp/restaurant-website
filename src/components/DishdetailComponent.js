import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";


class DishDetail extends Component {

    renderDish(dish){
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
    }

    renderComments(comments){
        return comments!= null ? (
            <>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map(comment=>(
                            <div key={comment.id}>
                                <li className="mt-1">{comment.comment}</li>
                                <li className="mt-1">-- {comment.author} , {new Date(comment.date).toUTCString()}</li>
                            </div>
                    ))
                    }
                </ul>
            </>
        )
        :
        (<div> </div>)
    }

    render() {
        const dish = this.props.dish;
        return dish!= null? (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dish.comments)}
                </div>
            </div>
        )
        :
        <div></div>
    }
}

export default DishDetail;
