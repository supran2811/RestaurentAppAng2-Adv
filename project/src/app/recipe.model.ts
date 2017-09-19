export class Recipe {
    name: string;
    descripion: string;
    imagePath: string;

    constructor(name:string , desc: string , imagePath:string){
        this.name = name;
        this.descripion = desc;
        this.imagePath = imagePath;
    }
}