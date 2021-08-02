import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import Link from 'next/link';
import Avatar from 'react-avatar';
// import 'semantic-ui-css/semantic.min.css'



const UserDropDown = ({setLogout, user, language, API_HOST}) => {    

    const logOutHandle = () => {
        setLogout()
    }


    return (
        <Dropdown
          inline
          trigger={<><Avatar round={true} size="50" src={ (user.avatar&&user.avatar?.url)>0?API_HOST + user.avatar.url: `https://avatars.dicebear.com/api/avataaars/${user.id}.svg`} /></>}
        >
            <Dropdown.Menu>
                <Link href={'/profile'}>
                    <Dropdown.Item text={language?language?.profile:'Profile'} />
                </Link>
                <Link href={'/orders'}>
                    <Dropdown.Item text={language?language?.myorders:'My Orders'} />
                </Link>
                <Dropdown.Divider />
                <Link href={'/myservices'}>
                    <Dropdown.Item text={language?language?.myservices:'My Services'} />
                </Link>
                <Link href={'/myproducts'}>
                    <Dropdown.Item text={language?language?.myproducts:'My Products'} />
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logOutHandle} text={language?language?.logout:'Logout'} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserDropDown