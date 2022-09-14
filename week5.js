
class Dj{
    constructor(name, genre){
        this.name = name;
        this.genre = genre;
    }

    describe() {
        return `${this.name} plays ${this.genre}.`;
    }
}

class Festival {
    constructor(name){
        this.name = name;
        this.djs = [];
    }

    addDj(dj) {
        if(dj instanceof Dj){
            this.djs.push(dj);
        } else {
            throw new Error (`you can only add an instance of a dj. Argument is not a dj: ${dj}`);
        }
    }
    describe() {
        return `${this.dj} has ${this.djs.lenght} djs.`;
    }
}

class Menu{
    constructor() {
        this.festivals = [];
        this.selectedFestival = null;
    }

    start(){
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
          switch (selection){
            case '1':
                this.createFestival();
                break;
            case '2':
                this.viewFestival();
                break;
            case'3':
                this.deleteFestival();
                break;
            case '4':
                this.displayFestivals();
                break;
            default:
                selection = 0;

          }
          selection = this.showMainMenuOptions();

        }
        alert('Cancel');
    }

    showMainMenuOptions(){
        return prompt(`
          0) exit
          1) create new festival
          2) view festival
          3) delete festival
          4) display all festivals
        `);
    }

    showFestivalMenuOptions(festivalInfo){
        return prompt(`
        0) back
        1) create dj
        2) delete dj
        ---------------------
        ${festivalInfo}
        `);
    }

    displayFestivals(){
        let festivalString = '';
        for(let i = 0; i < this.festivals.length; i++){
            festivalString += i + ') ' + this.festivals[i].name + "\n";
        }
        alert(festivalString);
    }

    createFestival(){
        let name = prompt('Enter name for new festival:');
        this.festivals.push(new Festival(name));
    }

    viewFestival() {
        let index = prompt('Enter the festival you want to assist:');
        if (index > -1 && index < this.festivals.length){
            this.selectedFestival = this.festivals[index];
            let description = 'Festival Name: ' + this.selectedFestival.name + '\n';
            
            for(let i = 0; i < this.selectedFestival.djs.length; i++){
                description += i + ') ' + this.selectedFestival.djs[i].name + ' - '
                 + this.selectedFestival.djs[i].genre + '\n';
            }

            let selection = this.showFestivalMenuOptions(description);
            switch (selection){
                case '1':
                    this.createDj();
                    break;
                case '2':
                    this.deleteDj();

            }
        }
    }

    deleteFestival(){
        let index = prompt("Enter the name of the festival you want to delete: ");
        if(index > -1 && index < this.festivals.length) {
            this.festivals.splice(index, 1);
        }
    }

    createDj(){
        let name = prompt('Enter name for new dj: ');
        let genre = prompt('Enter genre for new dj: ')
        this.selectedFestival.djs.push(new Dj(name, genre));
    }

    deleteDj(){
        let index = prompt('Enter the index of dj you want to remove');
        if(index > -1 && index < this.selectedFestival.djs.length){
            this.selectedFestival.djs.splice(index, 1);

        }
    }
}

let menu = new Menu();
menu.start();