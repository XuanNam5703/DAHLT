import Footer from './component/Layout/Footer';
import Head from './component/Layout/Head';
import Menu_Left from './component/Layout/Menu_left';
import Menu_Acc from './component/Layout/Menu_acc';
import { useLocation } from 'react-router-dom';
function App(props) {
    let params1 = useLocation();
    // console.log(params1)
    
  return (
          <>
          <Head/>
              <section>
                  <div className="container">
                      <div className="row">
                            {params1['pathname'].includes("/member/user") ? <Menu_Acc/> : <Menu_Left/> } 
                            {props.children}  
                      </div>
                  </div>
              </section>
            <Footer/>
          </>
          
          
        );
      }

export default App;
