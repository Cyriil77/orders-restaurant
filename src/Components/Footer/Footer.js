import React from 'react';
import { Link } from 'react-router-dom';

import './style.css'

export default function Footer() {
    return (

        <footer className="page-footer bg-dark font-small indigo">
        
          <div className="container">
        
            <div className="row text-center d-flex justify-content-center pt-5">
        
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <Link className="text-white" to="welcome">Accueil</Link>
                </h6>
              </div>
        
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <Link className="text-white" to="commande">Commande</Link>
                </h6>
              </div>
        
              <div className="col-md-2 mb-3">
                <h6 className="text-uppercase font-weight-bold">
                  <Link className="text-white" to="summaryOrders">Récapitulatifs</Link>
                </h6>
              </div>
            </div>

            <hr className="mx-auto rgba-white-light"/>

        
          </div>
        
          <div className="footer-copyright text-white text-center py-3">© 2020 Copyright:
            <a className="text-white" href="https://marceau-cyril.com.com/"> Cyril MARCEAU</a>
          </div>
        
        </footer>


    )
}