import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import settings from '../_settings';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

class Home extends Component {
  componentWillMount() {
    document.title = 'Reach your destination with maximum security.';

    window.initMap = () => {
      let SMMegaMall = { lat: 14.583366, lng: 121.057135 };

      let map = new google.maps.Map(this.refs.locationMap, {
        zoom: 17,
        center: SMMegaMall,
        scrollwheel: false
      });
      
      let marker = new google.maps.Marker({
        position: SMMegaMall,
        map: map
      });
    }

    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home">
        <Topbar />

        <div className="welcome-banner">
          <div className="centered">
            <img src={settings.public_path + '/banner-icon.png'} />
            <div className="welcome-text">
              <h1>Bus Liner</h1>
              <h3>The best travel buddy you will ever find.</h3>
            </div>
          </div>
        </div>

        <div className="image-columned-container">
          <div className="wrapper">
            <section>
              <header>
                <img src={settings.public_path + '/safe.png'} />
                <h1>Absolutely safe</h1>
              </header>
              <p>Quisque auctor sed dolor tempus aliquet. Morbi at faucibus ipsum. Proin diam orci, aliquam a pharetra nec, commodo id lectus. Nulla nulla eros, elementum eu tempor et, feugiat vel risus. Duis ultricies non purus a mollis. Proin et purus commodo, fermentum justo at, lobortis mauris. Etiam facilisis sapien elit, vel finibus quam lobortis id. Donec elementum ullamcorper erat, vel dapibus ipsum blandit eu. Ut risus nisl, porta viverra lacinia id, hendrerit nec purus. Ut quis augue nulla. Praesent vitae enim et mauris ornare tristique. Aliquam velit velit, consectetur et risus sollicitudin, posuere commodo enim. Sed aliquet risus luctus nisi congue dictum.</p>
            </section>
            <section>
              <header>
                <img src={settings.public_path + '/reliable.png'} />
                <h1>Extremely reliable</h1>
              </header>
              <p>Aliquam non mauris sagittis, fringilla leo a, porttitor purus. Integer luctus suscipit nunc, maximus tincidunt augue lobortis a. Nunc interdum lacus nec mauris porta bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam sagittis mollis placerat. In quis leo sapien. Curabitur elementum tempor euismod. Nam fringilla libero non massa auctor finibus. Maecenas ac purus est. Maecenas accumsan, nisi at sollicitudin rutrum, lorem purus fermentum mauris, id facilisis turpis tellus ac ante. Praesent eget velit rutrum felis pretium pellentesque. Fusce ut lectus orci. Sed eget magna euismod, vehicula augue et, facilisis felis.</p>
            </section>
            <section>
              <header>
                <img src={settings.public_path + '/secured.png'} />
                <h1>Highly secured</h1>
              </header>
              <p>Proin fermentum diam elit, in tristique tellus hendrerit vitae. Sed et ultrices leo. Proin bibendum odio ac semper laoreet. Vivamus ut arcu nunc. Morbi at mauris lorem. Vestibulum venenatis massa diam, eget aliquet felis ullamcorper vestibulum. Duis placerat placerat ligula, quis pharetra augue hendrerit a. Suspendisse mollis a justo consequat posuere. Etiam efficitur urna et fermentum lacinia. Sed varius lorem et rhoncus laoreet. Integer egestas nulla at ligula sagittis maximus. Cras porta vehicula augue nec rhoncus.</p>
            </section>
            <section>
              <header>
                <img src={settings.public_path + '/full-customer-support.png'} />
                <h1>24x7x365 customer support</h1>
              </header>
              <p>Pellentesque luctus, nisl vel malesuada aliquet, metus nisl ultrices quam, in finibus magna purus sit amet quam. Vestibulum porttitor vel lacus at tincidunt. Ut et consectetur nibh. Integer neque mauris, aliquam eu justo vitae, accumsan condimentum turpis. Sed blandit dictum lorem. Nullam rutrum consequat elit, eu imperdiet nunc bibendum id. Nullam enim purus, molestie ac metus sit amet, feugiat luctus lorem.</p>
            </section>
          </div>
        </div>

        <div className="image-centered-container location">
          <section>
            <header>
              <img src={settings.public_path + '/location.png'} />
              <h1>Our location</h1>
            </header>
            <p>Nullam porta nisi quis eleifend ornare. Pellentesque auctor volutpat lectus mattis convallis. Phasellus elit quam, vulputate a nulla id, luctus lacinia turpis. Maecenas in semper ligula. Ut non tellus magna. Nam lectus nisi, viverra ac mauris nec, accumsan tincidunt tortor. Maecenas varius enim vel dolor faucibus dictum. Vestibulum sed feugiat nisi. Proin maximus sapien nec lacus viverra, in pretium elit blandit. Maecenas vel urna facilisis, feugiat leo nec, convallis risus. Sed tristique nec tellus et venenatis.</p>
          </section>
          <div className="map-holder" ref="locationMap" style={{height: '500px', width: '100%'}} />
        </div>

        <div className="image-columned-container">
          <div className="wrapper">
            <section>
              <header>
                <img src={settings.public_path + '/mission.png'} /> 
                <h1>Our mission</h1>
              </header>
              <p>Mauris vitae ipsum gravida, vestibulum erat aliquet, ultricies neque. Suspendisse potenti. Vestibulum aliquam nibh vitae lorem convallis eleifend. Vestibulum tristique arcu et ligula feugiat sollicitudin. Morbi gravida vel leo pellentesque hendrerit. Vestibulum dapibus consectetur metus vel ornare. Fusce sagittis malesuada justo sit amet euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur nibh ligula, condimentum quis feugiat id, fringilla ut nulla. Praesent pellentesque condimentum consectetur. Sed dignissim felis quis libero tristique, non ultricies metus gravida. Maecenas non elit ut lectus iaculis blandit eu in arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet convallis diam, ut egestas dui. In dictum, nulla ut fermentum laoreet, nulla augue auctor mauris, nec bibendum arcu elit sit amet massa.</p>
            </section>
            <section>
              <header>
                <img src={settings.public_path + '/vision.png'} />
                <h1>Our vision</h1>
              </header>
              <p>Maecenas non ipsum risus. Vivamus iaculis arcu in neque sollicitudin facilisis. Aliquam risus quam, scelerisque non rhoncus pellentesque, posuere sit amet risus. Nam iaculis arcu posuere, sodales elit non, vulputate arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas cursus nisi at leo hendrerit, a varius velit condimentum. Donec sed ultricies dolor. Donec at orci efficitur, vulputate est in, elementum urna. Suspendisse potenti. In ullamcorper porttitor dui non faucibus. Pellentesque ut fringilla odio. Cras porttitor est quis odio ultricies, at commodo mi elementum. Pellentesque tristique elit dui, non hendrerit nulla ultricies posuere. Donec rutrum, enim eget sagittis dapibus, erat risus porta neque, at tristique sapien nibh sed nisi.</p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({

}), {
  
})(Home);