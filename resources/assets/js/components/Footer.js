import React, { Component } from 'react';

import settings from '../_settings';

class Footer extends Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="columned-container">
          <section>
            <ul>
              <li><a href="#">Sed justo erat</a></li>
              <li><a href="#">Nunc rhoncus</a></li>
              <li><a href="#">Etiam quis justo orci</a></li>
              <li><a href="#">Aenean nec dui pretium</a></li>
              <li><a href="#">Quisque faucibus</a></li>
              <li><a href="#">Ut pretium urna</a></li>
            </ul>
          </section>
          
          <section>
            <ul>
              <li><a href="#">Lorem ipsum dolor</a></li>
              <li><a href="#">Nunc aliquet</a></li>
              <li><a href="#">Vestibulum sollicitudin</a></li>
              <li><a href="#">Quisque a aliquet</a></li>
              <li><a href="#">Donec mollis enim</a></li>
              <li><a href="#">Phasellus pellentesque</a></li>
            </ul>
          </section>
          
          <section>
            <ul>
              <li><a href="#">In vitae risus</a></li>
              <li><a href="#">Pellentesque semper</a></li>
              <li><a href="#">Nunc condimentum</a></li>
              <li><a href="#">Integer varius</a></li>
              <li><a href="#">Nullam tincidunt</a></li>
              <li><a href="#">Nulla scelerisque</a></li>
            </ul>
          </section>
        </div>

        <div className="copy-right">
          &copy; Bus Liner corp. All rights reserved 2017
        </div>
      </footer>
    );
  }
}

export default Footer;