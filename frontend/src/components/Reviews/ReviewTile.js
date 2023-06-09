import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import OpenModalButton from '../OpenModalButton';
import DeleteReviewModal from './DeleteReviewModal'

const ReviewTile = ({ reviewData }) => {
    const { User, createdAt, review, id } = reviewData;
    const sessionUser = useSelector((state) => state.session.user)
    const [showMenu, setShowMenu] = useState(false);

    const created = new Date(createdAt)

    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    const month = months[created.getMonth() - 1]

    const closeMenu = () => setShowMenu(false);

    return (
        <div className='review-tile'>
            <h4>{User.firstName}</h4>
            <h5>{month} {created.getFullYear()}</h5>
            <p>{review}</p>
            {sessionUser && sessionUser.id === User.id && <OpenModalButton buttonText="Delete" onButtonClick={closeMenu} modalComponent={<DeleteReviewModal spotId={reviewData.spotId} id={id} />} />}
        </div>
    )
}

export default ReviewTile;
