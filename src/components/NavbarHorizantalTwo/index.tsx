type Props = {
    name : string;  
    icon : string;      
}
export default function NavBarHorizontalTwo({ name, icon } : Props){    
    return(
        <>
            <nav className="navbar-horizontal navbar-horizontal-secondary ">
                <a href="#"><span>{name}</span>  <i className={icon} /></a>
            </nav>
        </>
    );
}