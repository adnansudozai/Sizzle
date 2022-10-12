



import axios from 'axios'
import {openDatabase} from 'react-native-sqlite-storage';
const BASE_URL=`https://api-sizzle.herokuapp.com/api/v1/`

export const Userlogin=(isLogin)=>{

  const db = openDatabase(
    {name: 'sizzleWallet.db', createFromLocation: 1},
    successCB,
    errorCB,
    openCB,
  );
  
  const errorCB = err => {
    console.log('SQL Error: ' + err);
  };
  
  const successCB = () => {
    console.log('SQL executed fine');
  };
  const openCB = () => {
    console.log('Database OPENED');
  };
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Users set isLogin=?  where id=?',
      [
      isLogin,
      1
      ],
      (tx, resul) => {
        if (resul.rowsAffected > 0) {
         return 'Result Updated'
        } else {
         return 'Fail to Updated'

        }
      },
    );
  });



}

export const checkUserLogin=(callback)=>{

const db = openDatabase(
  {name: 'sizzleWallet.db', createFromLocation: 1},
  successCB,
  errorCB,
  openCB,
);

const errorCB = err => {
  console.log('SQL Error: ' + err);
};

const successCB = () => {
  console.log('SQL executed fine');
};
const openCB = () => {
  console.log('Database OPENED');
};
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Users',[],
      (tx, resul) => {
console.log('czlll',tx),

console.log('czlll',resul);
       
        callback(resul.rows.item(0).isLogin)
       
      },
    );
  });

}

export const register_User = async(data) => {


    return new Promise((resolve, reject) => {
        //  console.log('params',params)
        console.log('url', BASE_URL+ 'users',data)

        try {

          axios({
            method: 'post',
            url: BASE_URL + 'users',
            data: data,
            headers: {
              'accept': 'application/json',
              'content-Type': 'application/json'
            },
          })
            .then(async (response) => {
              resolve(response)
            })
            .catch((err) => {
              reject(err.response)
          console.log('responseerror catch',err);
    
            })
        } catch (error) {
          reject(error)
          console.log('try catch',error);
        }
      })






}


export const login_User = async(data) => {


    return new Promise((resolve, reject) => {
        //  console.log('params',params)
        console.log('url', BASE_URL+ 'sign_in',data)

        try {

          axios({
            method: 'post',
            url: BASE_URL + 'sign_in',
            data: data,
            headers: {
              'accept': 'application/json',
              'content-Type': 'application/json'
            },
          })
            .then(async (response) => {
              resolve(response)
           
            })
            .catch((err) => {
              reject(err.response)
          console.log('responseerror catch',err);
    
            })
        } catch (error) {
          reject(error)
          console.log('try catch',error);
        }
      })






}



export const update_profile = async(data,token) => {



  return new Promise((resolve, reject) => {
      //  console.log('params',params)
      console.log('url', BASE_URL+ 'users',data,'\ntoken',token)

      try {

        axios({
          method: 'put',
          url: BASE_URL + 'users',
          data: data,
          headers: {
            'accept': 'multipart/form-data',
            'content-Type': 'multipart/form-data',
          'Authorization': 'Bearer '+token
          },
        })
          .then(async (response) => {
            resolve(response)
         
          })
          .catch((err) => {
            reject(err.response)
        console.log('responseerror catch',err);
  
          })
      } catch (error) {
        reject(error)
        console.log('try catch',error);
      }
    })






} 

export const reset_password = async(data) => {

console.log('reset pass',data);
  return new Promise((resolve, reject) => {
  

      try {

        axios({
          method: 'post',
          url: BASE_URL + 'password',
          data: data,
          headers: {
            'accept': 'application/json',
            'content-Type': 'application/json'
          },
        })
          .then(async (response) => {
            resolve(response)
         
          })
          .catch((err) => {
            reject(err.response)
        console.log('responseerror catch',err);
  
          })
      } catch (error) {
        reject(error)
        console.log('try catch',error);
      }
    })






} 

export const new_password = async(data) => {


  return new Promise((resolve, reject) => {
  

      try {

        axios({
          method: 'put',
          url: BASE_URL + 'password',
          data: data,
          headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
           
          },
        })
          .then(async (response) => {
            resolve(response)
         
          })
          .catch((err) => {
            reject(err.response)
        console.log('responseerror catch',err);
  
          })
      } catch (error) {
        reject(error)
        console.log('try catch',error);
      }
    })
{/*
*/}





} 

export const change_password = async(data,token) => {

  console.log('reset pass',data,token);
    return new Promise((resolve, reject) => {
    
  
        try {
  
          axios({
            method: 'put',
            url: BASE_URL + 'update-password',
            data: data,
            headers: {
              'accept': 'multipart/form-data',
              'content-Type': 'multipart/form-data',
              'Authorization': 'Bearer'+token
            },
          })
            .then(async (response) => {
              resolve(response)
           
            })
            .catch((err) => {
              reject(err.response)
          console.log('responseerror catch',err);
    
            })
        } catch (error) {
          reject(error)
          console.log('try catch',error);
        }
      })
  
  
  
  
  
  
  } 


export const email_verification = async(data,token) => {

console.log(data,token);
  return new Promise((resolve, reject) => {
  

      try {

        axios({
          method: 'post',
          url: BASE_URL + 'confirmation',
          data: data,
          headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          },
        })
          .then(async (response) => {
            resolve(response)
         
          })
          .catch((err) => {
            reject(err.response)
        console.log('responseerror catch',err);
  
          })
      } catch (error) {
        reject(error)
        console.log('try catch',error);
      }
    })






} 


export const verifay_authcode = async(data) => {

console.log('data,token',data);
  return new Promise((resolve, reject) => {
  

      try {

        axios({
          method: 'get',
          url: BASE_URL + 'confirmation',
          data: data,
          headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
     
          },
        })
          .then(async (response) => {
            resolve(response)
         
          })
          .catch((err) => {
            reject(err.response)
        console.log('responseerror catch',err);
  
          })
      } catch (error) {
        reject(error)
        console.log('try catch',error);
      }
    })






} 


export const getRefer_user = async(token) => {

  console.log('data,token',token);
    return new Promise((resolve, reject) => {
    
  
        try {
  
          axios({
            method: 'get',
            url: BASE_URL + 'referred_users',
            headers: {
              'accept': 'application/json',
              'content-Type': 'application/json',
              'Authorization': 'Bearer '+token
            },
          })
            .then(async (response) => {
              resolve(response)
           
            })
            .catch((err) => {
              reject(err.response)
          console.log('responseerror catch',err);
    
            })
        } catch (error) {
          reject(error)
          console.log('try catch',error);
        }
      })
  
  
  
  
  
  
  } 
  
export const Logout_user = async(token) => {

  console.log('token',token);
    return new Promise((resolve, reject) => {
        try {
  
          axios({
            method: 'DELETE',
            url: BASE_URL + 'sign_out',
            headers: {
              'Authorization': 'Bearer '+token
            },
          })
            .then(async (response) => {
              resolve(response)
           
            })
            .catch((err) => {
              reject(err.response)
          console.log('responseerror catch',err);
    
            })
        } catch (error) {
          reject(error)
          console.log('try catch',error);
        }
      })
  
  
  
  
  
  
  } 
  
  export const check_userauth = async(token) => {

    console.log('token=======>>>>',token);
      return new Promise((resolve, reject) => {
          try {
    
            axios({
              method: 'GET',
              url: BASE_URL + 'member-data',
              headers: {
                'Authorization': 'Bearer'+token
              },
            })
              .then(async (response) => {
                resolve(response)
             
              })
              .catch((err) => {
                reject(err.response)
            console.log('responseerror catch',err);
      
              })
          } catch (error) {
            reject(error)
            console.log('try catch',error);
          }
        })
    
    
    
    
    
    
    } 
    