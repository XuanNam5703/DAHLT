import Footer from './component/Layout/Footer';
import Head from './component/Layout/Head';
import Menu_Left from './component/Layout/Menu_left';

function App(props) {
  return (
          <>
          <Head/>
              <section>
                  <div className="container">
                      <div className="row">
                            <Menu_Left/>
                            {props.children}
                      </div>
                  </div>
              </section>
            <Footer/>
          </>
          
          
        );
      }

export default App;
