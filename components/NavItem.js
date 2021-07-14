import Link from 'next/link';

const NavItem = (props) => {
    return (
        <div className="nav__item">
            <Link href={props.link}>
                <a className={`nav__link ${props.active?"nav__item--active":""}`}>{props.text}</a>
            </Link>
        </div>
    )
}

export default NavItem;