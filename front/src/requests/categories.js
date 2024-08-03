import backUrl from ".";

export async function getCategories(offset,limit,order,search){

  var result = backUrl.get(`/categories`,{offset: 20,limit,order,search})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

  return result
}


export async function getCategory(id){
  var result =  backUrl.get(`/categories/${id}`)
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}


export async function updateCategory(id,data){
  var result =  backUrl.put(`/categories/${id}`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function createCategory(data){
  var result =  backUrl.post(`/categories/`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function deleteCategory(id){
  var result =  backUrl.delete(`/categories/${id}`,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}