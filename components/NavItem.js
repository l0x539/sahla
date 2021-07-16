import Link from 'next/link';

const NavItem = (props) => {
    return (
        <Link href={props.link}>
            <div className="nav__item nav__item--link">
                
                    <a className={`nav__link ${props.active?"nav__item--active":""}`}>{props.text}</a>
            </div>
        </Link>
    )
}

export default NavItem;