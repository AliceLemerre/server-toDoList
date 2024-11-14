import React from 'react';

interface HelloProps {
    firstname: string;
}

function Hello({firstname}: HelloProps) {
    return (<h1> Hello {firstname}</h1>)
}

export default Hello;

