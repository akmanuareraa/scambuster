// This is a skeleton starter React component generated by Plasmic.
// This file is owned by you, feel free to edit as you see fit.
import * as React from "react";
import {useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import "../sass/circularprogressbars.scss";
import { useNavigate } from 'react-router-dom'
import protonabi from '../contract/proton.js'
var protonABI = JSON.parse(protonabi);


function VerifyLink_(props) {

const navigate = useNavigate();


  useEffect(() => {
    props.urlParser();
}, [])

useEffect(() => {
  if(!props.isWeb3)
  props.ConnectWallet();

})

const [validator, setValidator] = useState({ status : false});
const protonAddress = '0x222A1417108fde10eD49d447E782FbD30F8ADF37';

  
const checkValidator = () => {
  
var contractProton = new props.web3.eth.Contract(protonABI,protonAddress);

contractProton.methods
       .balanceOf(props.account)	 
       .call({from: props.account}).then(function(response,error){
       
          console.log("response",response);
          let balance = response/Math.pow(10,18);
          
          if( balance >= 25)
          {
            alert("You are already a Scambuster validator!")

          setValidator(prevState => {
            return {
                ...prevState,
                status: true
            }
            });
        }
        else
        {
          createValidator();
        }
      })
    } 

const createValidator = () => {
  
    const server = "localhost:5000"
  
    let app = this;
    var url = 'http://'+ server+'/mintValidator';
       
  
            
      var params = JSON.stringify({
        address: props.account
      });
  
    console.log("url",url);  
  
    console.log(params,"params");	
  
      fetch(url, {
  
      method: 'POST',
    mode: 'cors',
    
      headers: {
      'Accept': 'application/json',
      'Content-Type':'application/json',
          },	
      body: params
          
        }).then(function(response,error) {
    
  
          if(response)
        {
          if(response.status == 200)
          alert("Congratulations. You are a Scambuster validator!")

          setValidator(prevState => {
            return {
                ...prevState,
                status: true
            }
        });

          return response.json();
        }
      else 
        {
          console.log(error);
        }
        }).then(function(data){
          
          console.log("Response from mint",data);
  
    
        })
    }
  

  
    	
return(
  <div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="box">           
              
              <div className="columns is-centered">  
              
              <div className="column is-6">
                
              <nav className="panel is-light">
              <p class="panel-heading is-centered">
              Verify Account
              </p>
              {
                !props.isWeb3?
              <div className="panel-block ">
                Please connect Metamask wallet to continue
              </div>:
              props.allUrlParams.address == props.account && validator.status == true? 
              <div className="panel-block ">

              <div className="column has-text-centered">        
              Congratulations! You are a Scambuster Validator!   <br></br><br></br>    
                            <a className="button is-success"  onClick={() => navigate('/') }>Back to Homepage</a>
              </div>
             </div>:
              props.allUrlParams.address == props.account? 
              <div className="panel-block ">
              
              
              <div className="column has-text-centered">  
              Account verified successfully! <br></br><br></br>         
                            <a className="button is-success"  onClick={() => checkValidator() }>Become a Validator</a>
              </div>
             </div>:
             <div className="panel-block ">
             Please connect the account - {props.allUrlParams.address} 
            </div>

              }
              </nav>
              </div>
              </div>
              <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
  <div className="columns">
  <div className="column"></div>
  </div>
  <div className="columns">
  <div className="column"></div>   
  </div>
              </div>
        
    </div>
                              
)


}

const VerifyLink = React.forwardRef(VerifyLink_);

export default VerifyLink;
