import React, { useEffect, useState } from "react";
import axios from "axios";
import { Obtener_Token, Obtener_Ruta } from '../../util/Info_token';
import { useNavigate, useParams } from "react-router-dom";
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


    try {
      const response = axios({
        url: url + "/file",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (response) {
        console.log(response.data);
        setFiles([...list_files, { type: response.data }]);
        //setIsVisible(current => !current);
        //style={{ visibility: isVisible ? 'visible' : 'hidden' }} para ocultar cosas
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
    <div className="App">{/*className="content-wrapper"*/}
      <h1>SELECCIONE UN ARCHIVO </h1>
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
        <div >
          <label>LINEA 1 :</label>
          <RadioInput label="sólo números" value="a" checked={num_opc} setter={setnum_opc} />
          <RadioInput label="número y palabras" value="b" checked={num_opc} setter={setnum_opc} />
          <RadioInput label="palabra y número" value="c" checked={num_opc} setter={setnum_opc} />
          <RadioInput label="sólo palabras" value="d" checked={num_opc} setter={setnum_opc} />

        </div>
        <div>
          <label>LINEA 2 :</label>
          <RadioInput label="sólo números" value="a" checked={num_opc2} setter={setnum_opc2} />
          <RadioInput label="número y palabras" value="b" checked={num_opc2} setter={setnum_opc2} />
          <RadioInput label="palabra y número" value="c" checked={num_opc2} setter={setnum_opc2} />
          <RadioInput label="sólo palabras" value="d" checked={num_opc2} setter={setnum_opc2} />
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
          <label>Mayúsculas / minúsculas :</label>
          <RadioInput label="Sólo la primera" value="1" checked={caps} setter={setcaps} />
          <RadioInput label="TODAS MAYÚSCULAS" value="2" checked={caps} setter={setcaps} />
        </div>
        <div>
          <label>Posición de la numeración :</label>
          <RadioInput label="arriba izquierda" value="1" checked={position} setter={setposition} />
          <RadioInput label="arriba centro" value="2" checked={position} setter={setposition} />
          <RadioInput label="arriba derecha" value="3" checked={position} setter={setposition} />
          <RadioInput label="abajo izquierda" value="4" checked={position} setter={setposition} />
          <RadioInput label="abajo centro" value="5" checked={position} setter={setposition} />
          <RadioInput label="abajo derecha" value="6" checked={position} setter={setposition} />
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
  );
};

export default Foliador;

const RadioInput = ({ label, value, checked, setter }) => {
  return (
    <label>
      <input type="radio" checked={checked == value} onChange={() => setter(value)} />
      <span>{label}</span>
    </label>
  );
};
/*
      <button onClick={(e) => descargarArchivo(e.target.value)}>
        DESCARGAR PDF
      </button>
      <button onClick={(e) => LimpiarCarpeta(e.target.value)}>
        Limpiar Carpeta
      </button>
      <form onSubmit={SubirArchivo} >
        <input type="file" onChange={SeleccionarArchivo} />
        <input type="submit" value="Upload File" />
      </form>
*/
