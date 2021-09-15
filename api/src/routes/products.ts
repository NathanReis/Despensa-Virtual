import express, { response } from 'express';
const router = express.Router();



let products:any = [
  {id:0, nome:"salgadinho"},
  {id:1, nome:"refrigerante"},
  {id:2, nome: "pão de forma"}
];

router.get("/", (req, res)=>{
   let indice = req.body.id;
   let product = products.id = indice;
   console.log(products);
   console.log(products[indice]);
   if(product){

     res.json(product)
   }else{
      res.send("Produto não encontrado");
      console.log("produto não encontrado");
   }

})

router.post("/", (req, res)=>{
  objProduct(req).then((r)=>{
    if(r == 1){
      res.json(`${req.body.nome} adicionado ao array`);
    }
  }).catch((error)=>{
    res.send(error);
  })

})

router.put("/", (req, res)=>{
  putProduct(req).then((r)=>{
    if(r == 1){
      res.type("txt");
      res.send("Atualizado");
    }
  }).catch((error)=>{
    res.send(error);
  })

})

router.delete("/", (req, res)=>{
  deleteProduct(req).then((r)=>{
    if(r==1){
      res.json(`${req.body.nome} apagado`);
    }
  }).catch((error)=>{
    res.send(error);
  })
})

function deleteProduct(product:any){

  let promise = new Promise((resolve, reject)=>{

    let id = product.body.id;
    let nome = product.body.nome;

    if(products[id]){
      products = products.filter((item:any)=>{
        return item.id != id ;
      })
      console.log(products)
      resolve(1);
    } else {
      reject("Produto não encontrado");
    }
  })

  return promise;
}


function putProduct(product:any){

  let promise = new Promise((resolve, reject)=>{

    let id = product.body.id;
    console.log(product.body);
    let nome = product.body.nome;

    if(products[id]){
      products.map((item:any)=>{
        if(item.id == id){
          return item.nome = nome;
        }
        return item;
      })
      resolve(1);
    } else {
      reject("Produto não encontrado");
    }
  })

  return promise;

}

function objProduct(product:any){

  let promisse = new Promise(function(resolve, reject){
    let obj = {id:0 , nome:""};
    let length = products.length;
    let numId;

    if(product.body.nome){

      if(length != 0){
        numId = (products[length -1].id + 1);

      } else{
          numId = 0;
      }

      obj.id = numId;
      obj.nome = product.body.nome;
      console.log(obj);
      products.push(obj);
      resolve(1);
    } else{

      reject("Erro");
    }
  }
)
  return promisse;

}

export  {router}
