export interface IProduct {
    id: number,
    nome: string,
    descricao: string,
    preco: number,
    imgUrl: string
}

export interface ICart {
    tenis: IProduct[];
    camisa: IProduct[];
    mochila: IProduct[];
    bone: IProduct[];
}
