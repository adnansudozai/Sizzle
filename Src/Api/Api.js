



import axios from 'axios'

const BASE_URL=`https://api-sizzle.herokuapp.com/api/v1/`

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