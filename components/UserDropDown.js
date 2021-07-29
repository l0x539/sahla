import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import Link from 'next/link';
import Avatar from 'react-avatar';
// import 'semantic-ui-css/semantic.min.css'



const UserDropDown = ({setLogout, user, API_HOST}) => {    

    const logOutHandle = () => {
        setLogout()
    }

    console.log("user1", API_HOST + user.avatar.url);

    return (
        <Dropdown
          inline
          trigger={<><Avatar round={true} size="50" src={ user.avatar&&user.avatar.url?.length>0?API_HOST + user.avatar.url: `https://avatars.dicebear.com/api/avataaars/${user.id}.svg`} /></>}
        >
            <Dropdown.Menu>
                <Link href={'/profile'}>
                    <Dropdown.Item text='Profile' />
                </Link>
                <Link href={'/orders'}>
                    <Dropdown.Item text='My Orders' />
                </Link>
                <Dropdown.Divider />
                <Link href={'/myservices'}>
                    <Dropdown.Item text='My Services' />
                </Link>
                <Link href={'/myproducts'}>
                    <Dropdown.Item text='My Products' />
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logOutHandle} text='Logout' />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserDropDown