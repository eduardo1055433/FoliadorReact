import jwt from 'jwt-decode';


export function Obtener_Token(){
    const userToken = sessionStorage.getItem('user-token');
    if(userToken !== 'undefined' ){
      if(userToken !== null){
        var decoded = jwt(userToken);
        return decoded;
      }
    }
}

export function Obtener_Ruta(){
    const userToken = sessionStorage.getItem('user-ruta');
    if(userToken !== 'undefined' ){
      if(userToken !== null){
        return userToken;
      }
    }
}

export function Obtener_Nombre(){
    const userToken = sessionStorage.getItem('user-token');
    if(userToken !== 'undefined' ){
      if(userToken !== null){
        var decoded = jwt(userToken);
        return decoded.user.nombre;
      }
    }
} 