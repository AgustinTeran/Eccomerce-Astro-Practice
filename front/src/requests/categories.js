import backUrl from ".";

export async function getCategories(offset,limit,order,search,showProducts){

  var result = await backUrl.get(`/categories`,{params: {offset,limit,order,search,showProducts}},)
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))
    
  return result
}


export async function getCategory(id){
  var result = await backUrl.get(`/categories/${id}`)
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}


export async function updateCategory(id,data){
  var result = await backUrl.put(`/categories/${id}`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function createCategory(data){
  var result = await backUrl.post(`/categories/`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function deleteCategory(id){
  var result = await backUrl.delete(`/categories/${id}`,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}