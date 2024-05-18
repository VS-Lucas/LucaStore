import { IBone } from './Bone';
import { ICamisa } from './Camisa';
import { IMochila } from './Mochila';
import { ITenis } from './Tenis';

export interface IProdutos {
    produtos: {
        tenis: ITenis[],
        camisa: ICamisa[],
        mochila: IMochila[],
        bone: IBone[]
    }
}
