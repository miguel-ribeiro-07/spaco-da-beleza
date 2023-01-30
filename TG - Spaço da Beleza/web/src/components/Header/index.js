const Header = () =>{
    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <span className="mdi mdi-account-circle"></span>
                <div className="text-right mr-3">
                    <small className="d-block m-0 p-0 ">Perfil</small>
                </div>
                <span className="mdi mdi-logout"></span>
                <div className="text-right mr-3">
                    <small className="d-block m-0 p-0 ">Sair</small>
                </div>
            </div>
        </header>
    )
}

export default Header