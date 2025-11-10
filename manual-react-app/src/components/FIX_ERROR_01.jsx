import React from "react";
const baseUrl = "https://images.pexels.com/photos/3119955/pexels-photo-3119955.jpeg?cs=srgb&dl=pexels-kelly-1179532-3119955.jpg&fm=jpg";
const person = {
    name: "Shribalann",
    imageId: "7vQD0fp",
    imageSize: 'm',
    theme: {
        backgroundColor: 'lightblue',
        color: 'black',
    }
};
export default function FIX_ERROR_01() {
    const a = baseUrl;
    const containerStyle = {
        backgroundColor: person.theme.backgroundColor,
        color: person.theme.color,
        padding: '20px',
        border: '2px solid blue',
        borderRadius: '10px',
        width: '500px',
        margin: '30px auto',
        textAlign: 'center'
    };
    const avatarStyle = {
        borderRadius: '10px',
        width: '90px',
        height: '90px',
        border: '2px solid black'
    };
    const headingStyle = {
        fontSize: '22px',
        margin: '15px 0'
    };
    const listStyle = {
        padding: 0,
        listStyle: 'none'
    };
    const listItemStyle = {
        background: '#e0e0e0',
        margin: '6px 0',
        padding: '10px',
        borderRadius: '8px',
        width: '95%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxSizing: 'border-box'
    };

    return (
        <div style={containerStyle}>
            <img
                className="avatar"
                src={a}
                height={90}
                width={90}
                style={avatarStyle}
                alt={person.name}
            />
            <h1 style={headingStyle}>{person.name}'s TO DO's</h1>
            <ul style={listStyle}>
                <li style={listItemStyle}>day 1</li>
                <li style={listItemStyle}>day 2</li>
                <li style={listItemStyle}>day 3</li>
            </ul>
        </div>
    );
}
