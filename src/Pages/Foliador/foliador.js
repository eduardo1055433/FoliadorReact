import React, { useEffect, useState } from "react";
import axios from "axios";
import { Obtener_Token, Obtener_Ruta } from '../../util/Info_token';
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FileDownload = require("js-file-download");



const url = "http://127.0.0.1:5000";

const Foliador = () => {
  const [num_opc, setnum_opc] = React.useState('a');
  const [num_opc2, setnum_opc2] = React.useState('a');
  const [font_name, setfont_name] = React.useState('a');
  const [font_size, setfont_size] = React.useState(12);
  const [left_margin, setleft_margin] = React.useState(0);
  const [right_margin, setright_margin] = React.useState(0);
  const [caps, setcaps] = React.useState(1);
  const [position, setposition] = React.useState(5);
  const [num_ini_x, setnum_ini_x] = React.useState('1');
  const [num_from_x, setnum_from_x] = React.useState('1');
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDow, setIsVisibleDow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [get_token, setToken] = useState(null);
  const [get_ruta, setRuta] = useState(null);
  const [list_files, setFiles] = useState([]);
  const [change_img, setImg] = useState('');
   

    const toastId = React.useRef(null);

    const notify = () => toastId.current = toast("Lorem ipsum dolor");
  
    const dismiss = () =>  toast.dismiss(toastId.current);
  
    const dismissAll = () =>  toast.dismiss();


  function descargarArchivo() {
    const Ruta = Obtener_Ruta();
    var axios = require('axios');
    var data = JSON.stringify({
      "carpeta": Ruta
    });

    var config = {
      method: 'post',
      url: url + '/download',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
      responseType: "blob", // Important
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        FileDownload(response.data, "defailt name.pdf");
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  function LimpiarCarpeta() {
    const Ruta = Obtener_Ruta();
    var data = JSON.stringify({
      "carpeta": Ruta
    });
    var config = {
      method: 'post',
      url: url + '/limpiar',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function SubirArchivo(event) {
    event.preventDefault();
    const Ruta = Obtener_Ruta();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("carpeta", Ruta);

    toastId.current = toast("Espere Por favor.....");
    try {
      const response = axios({
        url: url + "/file",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (response) {
        toast.dismiss(toastId.current);
        console.log(response.data);
        setFiles([...list_files, { type: response.data }]);
        //setIsVisible(current => !current);
        //style={{ visibility: isVisible ? 'visible' : 'hidden' }} para ocultar cosas
        toastId.current = toast.success('🦄 Archivo subido Correctamente !!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
 
      });
    } catch (error) {
      console.log(error);
    }
  }

  function OpcionesPdf() {
    const Ruta = Obtener_Ruta();
    var data = JSON.stringify({
      "num_opc": num_opc,
      "num_opc2": num_opc2,
      "font_name": font_name,
      "font_size": font_size,
      "left_margin": left_margin,
      "right_margin": right_margin,
      "caps": caps,
      "position": position,
      "num_ini_x": num_ini_x,
      "num_from_x": num_from_x,
      "carpeta": Ruta
    });
    console.log(num_opc, num_opc2, font_name, font_size, left_margin, right_margin, caps, position, num_ini_x, num_from_x);

    var config = {
      method: 'post',
      url: url + '/opciones',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data == 'OK') {
          console.log('TODO OK');
          setIsVisibleDow(current => !current);
        }
      })
      .catch(function (error) {
        console.log(error);
      });


  }

  const SeleccionarArchivo = (event) => {
    console.log(event.target.files[0].name);

    setSelectedFile(event.target.files[0]);
  };



  const handleSubmit = e => {
    e.preventDefault();
    OpcionesPdf();



  };
  useEffect(() => {

    LimpiarCarpeta();

    const Token = Obtener_Token();
    const Ruta = Obtener_Ruta();

  }, []);



  return (
    <div className="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row  ">
            <div class="col-md-6" >
              <h1>SELECCIONE UN ARCHIVO &nbsp;</h1>
              <form onSubmit={SubirArchivo} >
                <input type="file" onChange={SeleccionarArchivo} accept="application/pdf" />&nbsp;&nbsp;&nbsp;
                <input type="submit" value="Subir Pdf" />
              </form>
              <hr ></hr>              
            </div>
            <div class="col-md-6" >
              <br></br>
              <ol>
                {list_files.map((pdf_files) => (
                  <li key={pdf_files.type}>{pdf_files.type}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>


      <div className="content" >
        <div className="container-fluid">
          <form onSubmit={handleSubmit}  >
            <div className="row">
              <div className="col-md-6">
                <div className="card card-primary"   >
                  <div className="card-header">
                    <h3 className="card-title">Contenido en la hoja </h3>
                  </div>
                  <div className="card-body">

                    <div className="row">
                      <div className="col-6">
                        <div class="form-group" >
                          <div class="row"><label>Linea 1 :</label></div>
                          <div class="row"><RadioInput label="sólo números" radion="radioPrimary11" value="a" checked={num_opc} setter={setnum_opc} /></div>
                          <div class="row"><RadioInput label="número y palabras" radion="radioPrimary12" value="b" checked={num_opc} setter={setnum_opc} /></div>
                          <div class="row"><RadioInput label="palabra y número" radion="radioPrimary13" value="c" checked={num_opc} setter={setnum_opc} /></div>
                          <div class="row"><RadioInput label="sólo palabras" radion="radioPrimary14" value="d" checked={num_opc} setter={setnum_opc} /></div>

                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-group" >
                          <div class="row"><label>Linea 2 :</label></div>
                          <div class="row"><RadioInput label="sólo números" radion="radioPrimary15" value="a" checked={num_opc2} setter={setnum_opc2} /></div>
                          <div class="row"><RadioInput label="número y palabras" radion="radioPrimary16" value="b" checked={num_opc2} setter={setnum_opc2} /></div>
                          <div class="row"><RadioInput label="palabra y número" radion="radioPrimary17" value="c" checked={num_opc2} setter={setnum_opc2} /></div>
                          <div class="row"><RadioInput label="sólo palabras" radion="radioPrimary18" value="d" checked={num_opc2} setter={setnum_opc2} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Posicion en el Papel </h3>
                  </div>
                  <div className="card-body">
                    <div class="row">
                      <div class="col-12">
                        <div class="form-group" >
                          <div class="container">
                            <div class="row border">
                              <div class="col-md border"><RadioInput label="Arriba izquierda" radion="radioPrimary21" value="1" checked={position} setter={setposition} /></div>
                              <div class="col-md border"><RadioInput label="Arriba centro" radion="radioPrimary22" value="2" checked={position} setter={setposition} /></div>
                              <div class="col-md border"><RadioInput label="Arriba derecha" radion="radioPrimary23" value="3" checked={position} setter={setposition} /></div>
                            </div>
                            <div class="row border">
                              <div class="col-md ">&nbsp;</div>
                            </div>
                            <div class="row border">
                              <div class="col-md border"><RadioInput label="Abajo izquierda" radion="radioPrimary24" value="4" checked={position} setter={setposition} /></div>
                              <div class="col-md border"><RadioInput label="Abajo centro" radion="radioPrimary25" value="5" checked={position} setter={setposition} /></div>
                              <div class="col-md border"><RadioInput label="Abajo derecha" radion="radioPrimary26" value="6" checked={position} setter={setposition} /></div>
                            </div>
                          </div>

                        </div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">Opciones de Fuente de Impresión</h3>
                  </div>
                  <div className="card-body">
                    <div class="row">
                      <div class="col-6">
                        <div class="form-group" >
                          <div class="row"><label>Mayúsculas / minúsculas :</label></div>
                          <div class="row"><RadioInput label="Sólo la primera" radion="radioPrimary19" value="1" checked={caps} setter={setcaps} /></div>
                          <div class="row"><RadioInput label="TODAS MAYÚSCULAS" radion="radioPrimary20" value="2" checked={caps} setter={setcaps} /></div>


                          <div class="row"><label>TAMAÑO DE LETRA :  </label></div>
                          <div class="row"><input class="form-control  " type="number" value={font_size} onChange={e => setfont_size(e.target.value)} ></input></div>

                        </div>

                      </div>
                      <div class="col-6">
                        <div class="form-group" >
                          <div class="row"><label>Tipo de Letra : </label></div>
                          <div class="row"><RadioInput label="Courier" value="a" checked={font_name} setter={setfont_name} /></div>
                          <div class="row"><RadioInput label="Courier-Bold" value="b" checked={font_name} setter={setfont_name} /></div>
                          <div class="row"><RadioInput label="Courier-BoldOblique" value="c" checked={font_name} setter={setfont_name} /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">Posicion y Limites de Numeracion</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">

                        <div class="form-group" >
                          <label>NUMERO INICIAL :</label>
                          <input class="form-control" type="number" value={num_ini_x} onChange={e => setnum_ini_x(e.target.value)}></input>
                        </div>
                        <div class="form-group" >
                          <label>NUMERO DESDE LA PAGINA :</label>
                          <input class="form-control" type="number" value={num_from_x} onChange={e => setnum_from_x(e.target.value)}></input>
                        </div>

                      </div>
                      <div className="col-6">

                        <div class="form-group" >
                          <label>MARGEN DERECHO :</label>
                          <input class="form-control" type="number" value={left_margin} onChange={e => setleft_margin(e.target.value)}></input>
                        </div>
                        <div class="form-group" >
                          <label>MARGEN IZQUIERDO :</label>
                          <input class="form-control" type="number" value={right_margin} onChange={e => setright_margin(e.target.value)}></input>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <section class="content-header">
              <div class="container-fluid">
                <button type="submit" class="btn btn-primary btn-lg btn-block">Enviar Configuración</button>
                <button style={{ visibility: isVisibleDow ? 'visible' : 'hidden' }} onClick={(e) => descargarArchivo(e.target.value)} class="btn btn-primary btn-lg btn-block" >DESCARGAR PDF</button>
              </div>
            </section>
          </form>
        </div>
      </div >
      <div>
      <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" >  
        </ToastContainer>
    </div>
    </div>

    
  );
};

export default Foliador;

const RadioInput = ({ label, value, checked, setter, radion }) => {
  return (
    <div class="icheck-primary d-inline">
      <input type="radio" id={radion} checked={checked == value} onChange={() => setter(value)} />
      <label for={radion}>{label}</label>
    </div>
  );
};
/*

<div className="content-wrapper">
<div class="content">
<div class="container-fluid">



  <h1>NUMERADOR SISPLANI</h1>
  <form onSubmit={SubirArchivo} >
    <input type="file" onChange={SeleccionarArchivo} accept="application/pdf" />
    <input type="submit" value="Subir Pdf" />
  </form>
  <ol>
    {list_files.map((pdf_files) => (
      <li key={pdf_files.type}>{pdf_files.type}</li>
    ))}
  </ol>
  <form onSubmit={handleSubmit}  >
    <div class="card-body">
      <div class="row">
        <div class="col-sm-3">
          <div class="form-group clearfix" >
            <div class="row"><label>Linea 1 :</label></div>
            <div class="row"><RadioInput label="sólo números" radion="radioPrimary11" value="a" checked={num_opc} setter={setnum_opc} /></div>
            <div class="row"><RadioInput label="número y palabras" radion="radioPrimary12" value="b" checked={num_opc} setter={setnum_opc} /></div>
            <div class="row"><RadioInput label="palabra y número" radion="radioPrimary13" value="c" checked={num_opc} setter={setnum_opc} /></div>
            <div class="row"><RadioInput label="sólo palabras" radion="radioPrimary14" value="d" checked={num_opc} setter={setnum_opc} /></div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group clearfix" >
            <div class="row"><label>Linea 2 :</label></div>
            <div class="row"><RadioInput label="sólo números" radion="radioPrimary15" value="a" checked={num_opc2} setter={setnum_opc2} /></div>
            <div class="row"><RadioInput label="número y palabras" radion="radioPrimary16" value="b" checked={num_opc2} setter={setnum_opc2} /></div>
            <div class="row"><RadioInput label="palabra y número" radion="radioPrimary17" value="c" checked={num_opc2} setter={setnum_opc2} /></div>
            <div class="row"><RadioInput label="sólo palabras" radion="radioPrimary18" value="d" checked={num_opc2} setter={setnum_opc2} /></div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group clearfix" >
            <div class="row"><label>Mayúsculas / minúsculas :</label></div>
            <div class="row"><RadioInput label="Sólo la primera" radion="radioPrimary19" value="1" checked={caps} setter={setcaps} /></div>
            <div class="row"><RadioInput label="TODAS MAYÚSCULAS" radion="radioPrimary20" value="2" checked={caps} setter={setcaps} /></div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="form-group clearfix" >
            <label>Posición de la numeración :</label>
            <RadioInput label="arriba izquierda" radion="radioPrimary21" value="1" checked={position} setter={setposition} />
            <RadioInput label="arriba centro" radion="radioPrimary22" value="2" checked={position} setter={setposition} />
            <RadioInput label="arriba derecha" radion="radioPrimary23" value="3" checked={position} setter={setposition} />
            <RadioInput label="abajo izquierda" radion="radioPrimary24" value="4" checked={position} setter={setposition} />
            <RadioInput label="abajo centro" radion="radioPrimary25" value="5" checked={position} setter={setposition} />
            <RadioInput label="abajo derecha" radion="radioPrimary26" value="6" checked={position} setter={setposition} />
          </div>
        </div>
      </div>
      <div class="row">

      </div>
    </div>
    <div>

    </div>
    <div>
      <label>TIPO DE LETRA :</label>
      <RadioInput label="Courier" value="a" checked={font_name} setter={setfont_name} />
      <RadioInput label="Courier-Bold" value="b" checked={font_name} setter={setfont_name} />
      <RadioInput label="Courier-BoldOblique" value="c" checked={font_name} setter={setfont_name} />
    </div>
    <div>
      <label>TAMAÑO DE LETRA :</label>
      <input type="number" value={font_size} onChange={e => setfont_size(e.target.value)} ></input>
    </div>
    <div>
      <label>MARGEN DERECHO :</label>
      <input type="number" value={left_margin} onChange={e => setleft_margin(e.target.value)}></input>
    </div>
    <div>
      <label>MARGEN IZQUIERDO :</label>
      <input type="number" value={right_margin} onChange={e => setright_margin(e.target.value)}></input>
    </div>
    <div>
      
    </div>
    <div>
      
    </div>
    <div>
      <label>NUMERO INICIAL :</label>
      <input type="number" value={num_ini_x} onChange={e => setnum_ini_x(e.target.value)}></input>
    </div>
    <div>
      <label>NUMERO DESDE LA PAGINA :</label>
      <input type="number" value={num_from_x} onChange={e => setnum_from_x(e.target.value)}></input>
    </div>
    <button type="submit"   >ENVIAR CONFIGURACION</button>
  </form>
  <button style={{ visibility: isVisibleDow ? 'visible' : 'hidden' }} onClick={(e) => descargarArchivo(e.target.value)}>
    DESCARGAR PDF
  </button>










</div>
</div>

</div>
*/
