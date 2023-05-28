import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pic_refer from '../../resources/referral-tool.png'
import './referral.css'
import { config } from '../../resources/config/config.js';

function ReferralList() {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [messageSent, setMessageSent] = useState(false);
    const [name, setName] = useState('');
    const [refresh, setRefresh] = useState(false);
    const URL_TOOL_REFERRAL_NOTION_DB = config.url.URL_TOOL_REFERRAL_NOTION_DB;
    const URL_TOOL_REFERRAL_SLACK = config.url.URL_TOOL_REFERRAL_SLACK;
    useEffect(() => {
        // Fetch the list of strings from the API
        setRefresh(true);
        axios.get(URL_TOOL_REFERRAL_NOTION_DB)
            .then(response => {
                console.log(response.data); // Check the response data
                setItems(response.data);
            })
            .catch(error => {
                console.error(error);
            }).finally(() => setRefresh(false));
    }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleItemSelect = (item) => {
        // Check if the item is already selected
        const isSelected = selectedItems.includes(item);

        if (isSelected) {
            // Remove the item from the selected items
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else {
            // Add the item to the selected items
            setSelectedItems([...selectedItems, item]);
        }
    };

    const handleSendMessage = () => {
        const message = selectedItems.join(', '); // Concatenate selected items with new lines
        // Send a Slack message using your Slack API endpoint
        axios.post(URL_TOOL_REFERRAL_SLACK, name + " can help you to refer in these places - " + message, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                setMessageSent(true);
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <div className='referral-container'>

            <div className="referral-content">
                <div className="referral-text">
                    <h2>Kunal's Job Referral Assistance</h2>
                    <p>Hi there!👋</p>
                    <p>I am seeking job application referrals for the following companies.</p>
                    <p>If you have any connections who are willing to provide me with a referral for any of these companies, I would be grateful if you could kindly drop your name below.🙇</p>

                </div>
                <div className="referral-image">
                    <img src={pic_refer} alt="Profile" className="referral-profile-image" onContextMenu={(e) => e.preventDefault()} />
                </div>
            </div>
            <ul  className='referral-list'>
            {refresh && <p>Please wait while the system fetches the list</p>}
            {!refresh && items.map(item => (
                <div key={item}>
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(item)}
                        onChange={() => handleItemSelect(item)}
                    />
                    <span>{item}</span>
                </div>
            ))}
            </ul>
            <br/>
            <input className='referral-username'
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
            />
            <button className='referral-btn' onClick={handleSendMessage} disabled={selectedItems.length === 0 || messageSent}>
                {messageSent ? 'Message Sent!' : 'Share this list with Kunal'}
            </button>
            {messageSent && <p>Thanks for assisting. I will DM you as soon as possible</p>}
            <br/>
            <br/>
            <br/>
            <footer>
                <p className='copyright'>&copy; 2023 @|c)-(3m!5t's Lab. All rights reserved.</p>
            </footer>
        </div>
        
    );
}

export default ReferralList;