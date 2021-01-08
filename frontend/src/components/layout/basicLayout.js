import React, { Component} from "react";

const BasicLayout = ()=>(

<div className="row content-wrapper">
    <div className="col-sm-3">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">Search Settings</div>
                </div>
                <div className="card-body">
                </div>
            </div>
        </div> 
    </div>



    <div className="col-sm-6">

    <div className="row">
        <div className="col-sm-12">
            <input type="" name="" className="form-control" placeholder="Search" />
        </div>
    </div>


        <div className="content-wrapper">

            <div className="row"  >  
               <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <a href="">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">Transporter</div>
                            </div>
                            <div className="card-body">
                                <h6>Masvingo - Buhera</h6>
                                <span><strong>Estimated Budget</strong>  : 20 usd</span>&nbsp;&nbsp;
                                <span><strong>Estimated Weight</strong>   : 30 Kgs</span>&nbsp;&nbsp;
                                <span><strong>Posted</strong> 2 Days Ago</span>
                                <p className="card-text">Amazambane tthat </p>
                                
                                <span className="icon-local_atm"></span>&nbsp;Payment Method Verified &nbsp;&nbsp;
                                <span className="icon-star"></span><span className="icon-star"></span><span className="icon-star"></span> &nbsp;&nbsp;
                                <span className="icon-map-pin"></span>&nbsp;Bulwayo
                            </div>
                        </div>
                        </a>
                    </div>
            </div>
        
        </div>
       
        
    </div>
    <div className="col-sm-3">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">Availability </div>
                </div>
                <div className="card-body">
                    <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                        <label className="custom-control-label" htmlFor="customSwitch1">On</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

)


 export default BasicLayout;