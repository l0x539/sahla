import Link from 'next/link';

const SidenavLink = (props) => {
    return (
        <li className="sidenav__item">
            {
                props.islink?
            <Link href={props.link}>
                <a className="sidenav__link">{props.label}</a>
            </Link>:
            <a href={props.link} className="sidenav__link">{props.label}</a>
            }
        </li>
    );
}
 
export default SidenavLink;