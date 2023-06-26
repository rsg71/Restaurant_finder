

export default function Members() {

    function search() {
        
    }

    return (
        <div>
            <div className="jumbotron">
                <div className="container-fluid text-center">
                    <h1>Welcome <span className="member-name"></span></h1>
                    <div className="feedback alert alert-danger text-center text-capitalize">please enter city</div>
                    <h2>Please Enter City to Find Local Restaurants</h2>
                    <form id="searchForm" className="4">
                        <div className="display">
                            <div className="form-group row">
                                <select className="custom-select text-capitalize" id="searchCategory"></select>
                            </div>
                            <input type="text" className="form-control text-capitalize" id="searchCity" placeholder="Enter City...."></input>
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-primary" onClick={search}>search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}