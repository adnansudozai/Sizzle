



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

console.log('czlll');
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Users',[],
      (tx, resul) => {
       
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
{/*
*/}





} 

export const email_verification = async(data) => {


  return new Promise((resolve, reject) => {
  

      try {

        axios({
          method: 'post',
          url: BASE_URL + 'confirmation',
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