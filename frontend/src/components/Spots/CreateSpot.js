import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createSpotThunk } from '../../store/spotsReducer';
import { useHistory, Redirect } from 'react-router-dom';

const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState({url: '', preview: true});
    const [img1, setImg1] = useState({url: '', preview: false})
    const [img2, setImg2] = useState({url: '', preview: false})
    const [img3, setImg3] = useState({url: '', preview: false})
    const [img4, setImg4] = useState({url: '', preview: false})
    const [errors, setErrors] = useState({});
    const newSpot = useSelector((state) => state.spots.singleSpot)


    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        dispatch(createSpotThunk({
            country,
            address,
            city,
            state,
            description,
            title,
            price,
            images: [
                previewImg,
                img1,
                img2,
                img3,
                img4
            ]
        }))
            .then( async res => {
                if (res && res.errors) setErrors(res.errors)
                else history.push(`/spots/${res.id}`)
            })
    }
    return (
        <div className="create-spot-component">
            <h2>Create a new Spot</h2>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>
                <div className='create-spot-address'>
                    <label htmlFor='country'>Country </label>{errors.countr && <span className='errors'>{errors.country}</span>}
                    <input type='text' name='country' placeholder='Country'value={country} onChange={(e) => setCountry(e.target.value)} required={true}></input>
                    <label htmlFor='address'>Street Address </label>{errors.address && <span className='errors'>{errors.address}</span>}
                    <input type='text' name='address' placeholder='Address'value={address} onChange={(e) => setAddress(e.target.value)} required={true}></input>
                    <label htmlFor='city'>City</label>
                    <input type='text' name='city' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required={true}></input>
                    <label htmlFor='state'>State</label>
                    <input type='text' name='state' placeholder='STATE' value={state} onChange={(e) => setState(e.target.value)} required={true}></input>
                </div>
                <div className='create-spot-desc'>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <input type='textarea' placeholder="Please write at least 30 characters" value={description} onChange={(e) => setDescription(e.target.value)} required={true}></input>
                </div>
                <div className='create-spot-title'>
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input type='text' placeholder='Name of your spot' value={title} onChange={(e) => setTitle(e.target.value)} required={true}></input>
                </div>
                <div className='create-spot-price'>
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                    <span>$ </span> <input type='number' placeholder='Price per night (USD)' value={price} onChange={(e) => setPrice(e.target.value)} required={true}></input>
                </div>
                <div className='create-spot-photos'>
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input type='url' placeholder='PreviewImage URL' value={previewImg.url} onChange={(e) => setPreviewImg({preview: true, url: e.target.value})} required={true}></input>
                    <input type='url' placeholder='Image URL' value={img1.url} onChange={(e) => setImg1({preview: false, url: e.target.value})} required={true}></input>
                    <input type='url' placeholder='Image URL' value={img2.url} onChange={(e) => setImg2({preview: false, url: e.target.value})} required={true}></input>
                    <input type='url' placeholder='Image URL' value={img3.url} onChange={(e) => setImg3({preview: false, url: e.target.value})} required={true}></input>
                    <input type='url' placeholder='Image URL' value={img4.url} onChange={(e) => setImg4({preview: false, url: e.target.value})} required={true}></input>
                </div>
                <button type='submit'>Create Spot</button>
            </form>
        </div>
    )
}

export default CreateSpot;