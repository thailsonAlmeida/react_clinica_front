type Props = {
    name : string
}
export default function NavBarHorizontalOne( { name } : Props){
    return(
        <>
            <nav className="navbar-horizontal navbar-horizontal-primary ">
                <span>{name}</span>
            </nav>  
        </>
    );
}