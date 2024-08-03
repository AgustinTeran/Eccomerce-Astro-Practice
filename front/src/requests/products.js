import backUrl from ".";

export async function getProducts(offset,limit,order,search){

  var result = backUrl.get(`/products`,{offset: 20,limit,order,search})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

  return result
}


export async function getProduct(id){
  var result =  backUrl.get(`/products/${id}`)
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}


export async function updateProduct(id,data){
  var result =  backUrl.put(`/products/${id}`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function createProduct(data){
  var result =  backUrl.post(`/products/`,data,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}

export async function deleteProduct(id){
  var result =  backUrl.delete(`/products/${id}`,{headers: {token: cookies().get("token")?.value}})
    .then(res => res.data)
    .catch(err => ({error:err.response?.data || {message: "Could not make the request, server down"}}))

    return result
}