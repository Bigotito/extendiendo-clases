import {readFileSync} from 'fs'

type orderType = "asc" | "desc";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name:string){
    super(name);
    
    JSON.parse(readFileSync(__dirname + '/products.json').toString()).forEach((item:any)=>{
      this.addProduct(item);
    });
  };

  addProduct(productIn:Product){
    if(this.cosas.findIndex(function(item){
      return item.id == productIn.id;
    }) == -1) this.add(productIn);
  };

  getProduct(id:number){
    return this.cosas.find((item)=>{
      return item["id"] == id;
    });
  };

  removeProduct(id:number){
    const indexFinded = this.cosas.findIndex((item)=>{
      return item["id"] == id;
    })

    if(indexFinded != -1){
      this.cosas.splice(indexFinded,1);
    }
  }

  getSortedByPrice(order: orderType){
    if(order == 'asc'){
      return this.cosas.sort((a,b)=>{
        if(a["price"] < b["price"]){
          return -1;
        }
        if(a["price"] > b["price"]){
          return 1;
        }
        return 0;
      });
    }
    return this.cosas.sort((a,b)=>{
      if(a["price"] < b["price"]){
        return 1;
      }
      if(a["price"] > b["price"]){
        return -1;
      }
      return 0;
    });
  }
}

export { ListaDeProductos, Product };
