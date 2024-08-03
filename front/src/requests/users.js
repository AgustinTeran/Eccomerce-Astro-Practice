import backUrl from ".";

export async function getUsers(offset,limit,order,search){

  var result = backUrl.get(`/users`,{offset: 20,limit,order,search})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

  return result
}


export async function getUser(id){
  var result =  backUrl.get(`/users/${id}`)
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

// export async function getTokenUser(){
//   var result =  backUrl.get(`/users/profile`,{headers: {token: cookies().get("token")?.value}})
//     .then(res => res.data)
//     .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))e}))

//     return result
// }


// export async function updateUser(id,data){
//   var result =  backUrl.put(`/users/${id}`,data,{headers: {token: cookies().get("token")?.value}})
//     .then(res => res.data)
//     .then(() => revalidateTag(`usersTag`))
//     .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

//     return result
// }

// export async function createUser(data){
//   var result =  backUrl.post(`/users/`,data)
//     .then(res => res.data)
//     .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

//     return result
// }

// export async function authenticateUser(data){
//   var result =  backUrl.post(`/users/auth`,data)
//     .then(res => res.data)
//     .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

//     return result
// }


// export async function deleteUser(id){
//   var result =  backUrl.delete(`/users/${id}`,{headers: {token: cookies().get("token")?.value}})
//     .then(res => res.data)
//     .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

//     return result
// }